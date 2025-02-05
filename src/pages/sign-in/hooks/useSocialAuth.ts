import { useNavigate } from "react-router-dom";
import { SocialType } from "@/auth/socialType";
import { kakaoLoginService } from "@/auth/kakao";
import { googleLoginService } from "@/auth/google";

import { openModal } from "@/utils/modal";
import SignUpModal from "../components/sign-up-modal/SignUpModal";
import PATH from "@/router/path";
import { storage } from "@/utils/storage";
import AlertModal from "@/components/modal/system-modal/alert-modal/AlertModal";
import { storageKeys } from "@/constants/storageKeys";

import { usePostAuthLogin } from "@/api/generated/권한/권한";
//import { useAppleInfo } from "@/api/generated/권한/권한";

export const useSocialAuth = () => {
  const navigate = useNavigate();
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setRefreshToken = useAuthStore((state) => state.setRefreshToken);
  //const { mutateAsync: appleInfo } = useAppleInfo();
  const { mutate: login } = usePostAuthLogin({
    mutation: {
      onSuccess: (data) => {
        setIsAuthenticated(true);
        if (data.result?.accessToken && data.result?.refreshTokenId) {
          setAccessToken(data.result?.accessToken);
          setRefreshToken(data.result?.refreshTokenId);
        }

        navigate(PATH.HOME);
      },
      onError: (error) => {
        if (error?.toString().includes("트레이너를 찾을 수 없습니다.")) {
          openModal({ component: SignUpModal });
        } else {
          openModal({
            component: AlertModal,
            props: {
              errorMessage: error?.toString(),
              onCloseComplete: () => navigate(PATH.SIGN_IN),
            },
          });
        }
      },
    },
  });

  const initSocialLogin = ({ socialType }: { socialType: SocialType }) => {
    const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
    storage.set({
      key: storageKeys.trainerSnsKind,
      value: socialType.toUpperCase(),
      type: "local",
    });

    const socialLoginUrls = {
      KAKAO: `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${socialType}`,
      GOOGLE: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email&state=${socialType}`,
      //APPLE: `https://appleid.apple.com/auth/authorize?client_id=${import.meta.env.VITE_APPLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&response_mode=query&state=${socialType}`,
      APPLE: `https://appleid.apple.com/auth/authorize?client_id=${import.meta.env.VITE_APPLE_CLIENT_ID}&redirect_uri=https://api.fittner.co.kr/api/v1/auth/apple-redirect-url&response_type=code&response_mode=form_post&scope=email&state=${socialType}`,
    };

    window.location.href = socialLoginUrls[socialType];
  };

  const handleSocialCallback = async ({
    socialType,
    code,
    id_token,
  }: {
    socialType: SocialType;
    code: string;
    id_token: string;
  }) => {
    try {
      switch (socialType) {
        case "KAKAO": {
          const accessToken = await kakaoLoginService.getToken({ code });
          const userInfo = await kakaoLoginService.getUserInfo({
            accessToken,
          });
          storage.set({
            key: storageKeys.trainerEmail,
            value: userInfo.email,
            type: "local",
          });
          login({ data: { trainerEmail: userInfo.email } });
          break;
        }
        case "GOOGLE": {
          const accessToken = await googleLoginService.getToken({ code });
          const userInfo = await googleLoginService.getUserInfo({
            accessToken,
          });
          storage.set({
            key: storageKeys.trainerEmail,
            value: userInfo.email,
            type: "local",
          });
          login({ data: { trainerEmail: userInfo.email } });
          break;
        }
        case "APPLE": {
          console.log("애플 로그인 요청 인가 코드", code);
          console.log("애플 로그인 요청 인가 코드", id_token);
          // const response = await appleInfo({ data: { code } });
          // if (response.result?.userEmail) {
          // storage.set({
          //   key: storageKeys.trainerEmail,
          //   value: response.result.userEmail,
          //   type: "local",
          // });
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
