import { useNavigate } from "react-router-dom";
import { useLogin } from "@/api/generated/auth-controller/auth-controller";
import { SocialType } from "@/auth/socialType";
import { kakaoLoginService } from "@/auth/kakao";
import { googleLoginService } from "@/auth/google";

import { openModal } from "@/utils/modal";
import SignUpModal from "../components/sign-up-modal/SignUpModal";
import PATH from "@/router/path";
import { storage } from "@/utils/storage";
//import { useAppleInfo } from "@/api/generated/권한/권한";

export const useSocialAuth = () => {
  const navigate = useNavigate();
  //const { mutateAsync: appleInfo } = useAppleInfo();
  const { mutate: login } = useLogin({
    mutation: {
      onSuccess: (data) => {
        console.log("로그인 성공:", data);
        navigate(PATH.HOME);
      },
      onError: () => {
        openModal({ component: SignUpModal });
        navigate(PATH.SIGN_IN);
      },
    },
  });

  const initSocialLogin = ({ socialType }: { socialType: SocialType }) => {
    const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
    storage.set({
      key: "trainerSnsKind",
      value: socialType.toUpperCase(),
      type: "local",
    });

    const socialLoginUrls = {
      kakao: `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${socialType}`,
      google: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email&state=${socialType}`,
      //apple: `https://appleid.apple.com/auth/authorize?client_id=${import.meta.env.VITE_APPLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&response_mode=query&state=${socialType}`,
      apple: `https://appleid.apple.com/auth/authorize?client_id=${import.meta.env.VITE_APPLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&response_mode=query&state=${socialType}`,
    };

    window.location.href = socialLoginUrls[socialType];
  };

  const handleSocialCallback = async ({
    socialType,
    code,
    id_token
  }: {
    socialType: SocialType;
    code: string;
    id_token: string;
  }) => {
    try {
      switch (socialType) {
        case "kakao": {
          const accessToken = await kakaoLoginService.getToken({ code });
          const userInfo = await kakaoLoginService.getUserInfo({
            accessToken,
          });
          storage.set({
            key: "trainerEmail",
            value: userInfo.email,
            type: "local",
          });
          login({ data: { trainerEmail: userInfo.email } });
          break;
        }
        case "google": {
          const accessToken = await googleLoginService.getToken({ code });
          const userInfo = await googleLoginService.getUserInfo({
            accessToken,
          });
          storage.set({
            key: "trainerEmail",
            value: userInfo.email,
            type: "local",
          });
          login({ data: { trainerEmail: userInfo.email } });
          break;
        }
        case "apple": {
          console.log("애플 로그인 요청 인가 코드", code);
          console.log("애플 로그인 요청 인가 코드", id_token);
          // const response = await appleInfo({ data: { code } });
          // if (response.result?.userEmail) {
          //   storage.set("trainerEmail", response.result.userEmail, "local");
          //   login({ data: { trainerEmail: response.result.userEmail } });
          // }
          break;
        }
        default:
          throw new Error("Unknown social type");
      }
    } catch (error) {
      console.error(`${socialType} 로그인 처리 실패:`, error);
      navigate(PATH.SIGN_IN);
    }
  };

  return { initSocialLogin, handleSocialCallback };
};
