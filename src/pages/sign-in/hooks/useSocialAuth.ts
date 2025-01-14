import { useNavigate } from "react-router-dom";
import { useLogin } from "@/api/generated/auth-controller/auth-controller";
import { SocialType } from "@/auth/socialType";
import { kakaoLoginService } from "@/auth/kakao";
import { googleLoginService } from "@/auth/google";
import { appleLoginService } from "@/auth/apple";

export const useSocialAuth = () => {
  const navigate = useNavigate();

  const { mutate: login } = useLogin({
    mutation: {
      onSuccess: (data) => {
        console.log("로그인 성공:", data);
        navigate("/");
      },
      onError: (error) => {
        console.error("로그인 실패:", error);
        navigate("/sign-in");
      },
    },
  });

  const initSocialLogin = ({ socialType }: { socialType: SocialType }) => {
    const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

    if (socialType === "apple") {
      const tempRedirectUri = `${window.location.origin}/apple-redirect`;
      const appleUrl = `https://appleid.apple.com/auth/authorize?client_id=${import.meta.env.VITE_APPLE_CLIENT_ID}&redirect_uri=${tempRedirectUri}&response_type=code&scope=email&response_mode=form_post&state=${socialType}`;
      window.location.href = appleUrl;
      return;
    }

    const socialLoginUrls = {
      kakao: `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${socialType}`,
      google: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email&state=${socialType}`,
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
      let email: string;

      switch (socialType) {
        case "kakao": {
          const accessToken = await kakaoLoginService.getToken({ code });
          const userInfo = await kakaoLoginService.getUserInfo({
            accessToken,
          });
          email = userInfo.email;
          break;
        }
        case "google": {
          const accessToken = await googleLoginService.getToken({ code });
          const userInfo = await googleLoginService.getUserInfo({
            accessToken,
          });
          email = userInfo.email;
          break;
        }
        case "apple": {
          const accessToken = await appleLoginService.getToken({ code });
          const userInfo = await appleLoginService.getUserInfo({ accessToken });
          email = userInfo.email;
          break;
        }
        default:
          throw new Error("Unknown social type");
      }

      login({ data: { trainerEmail: email } });
    } catch (error) {
      console.error(`${socialType} 로그인 처리 실패:`, error);
      navigate("/sign-in");
    }
  };

  return { initSocialLogin, handleSocialCallback };
};
