export const useSocialLogin = () => {
  const handleSocialLogin = (socialType: "kakao" | "google" | "apple") => {
    const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

    const socialLoginUrls = {
      kakao: `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${socialType}`,
      google: "",
      apple: "",
    };

    window.location.href = socialLoginUrls[socialType];
  };

  return { handleSocialLogin };
};
