import { useNavigate } from "react-router-dom";
import { useLogin } from "@/api/generated/auth-controller/auth-controller";
import { SocialType } from "@/auth/socialType";
import { kakaoLoginService } from "@/auth/kakao";

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

    const socialLoginUrls = {
      kakao: `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${socialType}`,
      google: "",
      apple: "",
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
          const accessToken = await kakaoLoginService.getToken(code);
          const userInfo = await kakaoLoginService.getUserInfo(accessToken);
          email = userInfo.email;
          break;
        }
        case "google":
        case "apple":
          throw new Error("Not implemented");
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
