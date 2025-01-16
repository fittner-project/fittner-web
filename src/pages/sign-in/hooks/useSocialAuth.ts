import { useNavigate } from "react-router-dom";
import { useLogin } from "@/api/generated/auth-controller/auth-controller";
import { SocialType } from "@/auth/socialType";
import { kakaoLoginService } from "@/auth/kakao";
import { googleLoginService } from "@/auth/google";

import { openModal } from "@/utils/modal";
import SignUpModal from "../components/sign-up-modal/SignUpModal";
//import { useAppleInfo } from "@/api/generated/권한/권한";

export const useSocialAuth = () => {
  const navigate = useNavigate();
  //const { mutateAsync: appleInfo } = useAppleInfo();
  const { mutate: login } = useLogin({
    mutation: {
      onSuccess: (data) => {
        console.log("로그인 성공:", data);
        navigate("/");
      },
      onError: () => {
        openModal({ component: SignUpModal });
        navigate("/sign-in");
      },
    },
  });

  const initSocialLogin = ({ socialType }: { socialType: SocialType }) => {
    const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

    const socialLoginUrls = {
      kakao: `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${socialType}`,
      google: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email&state=${socialType}`,
      apple: `https://appleid.apple.com/auth/authorize?client_id=${import.meta.env.VITE_APPLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&response_mode=query&state=${socialType}`,
    };

    window.location.href = socialLoginUrls[socialType];
  };

  const handleSocialCallback = async ({
    socialType,
    code,
  }: {
    socialType: SocialType;
    code: string;
  }) => {
    try {
      switch (socialType) {
        case "kakao": {
          const accessToken = await kakaoLoginService.getToken({ code });
          const userInfo = await kakaoLoginService.getUserInfo({
            accessToken,
          });
          login({ data: { trainerEmail: userInfo.email } });
          break;
        }
        case "google": {
          const accessToken = await googleLoginService.getToken({ code });
          const userInfo = await googleLoginService.getUserInfo({
            accessToken,
          });
          login({ data: { trainerEmail: userInfo.email } });
          break;
        }
        case "apple": {
          console.log("애플 로그인 요청 인가 코드", code);
          // const response = await appleInfo({ data: { code } });
          // if (response.result?.userEmail) {
          //   login({ data: { trainerEmail: response.result.userEmail } });
          // }
          break;
        }
        default:
          throw new Error("Unknown social type");
      }
    } catch (error) {
      console.error(`${socialType} 로그인 처리 실패:`, error);
      navigate("/sign-in");
    }
  };

  return { initSocialLogin, handleSocialCallback };
};
