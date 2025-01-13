import { SocialLoginResponse } from "./socialType";

export const kakaoLoginService = {
  getToken: async (code: string): Promise<string> => {
    const tokenResponse = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: import.meta.env.VITE_KAKAO_CLIENT_ID,
        redirect_uri: import.meta.env.VITE_REDIRECT_URI,
        code,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      throw new Error(JSON.stringify(errorData));
    }

    const { access_token } = await tokenResponse.json();
    return access_token;
  },

  getUserInfo: async (accessToken: string): Promise<SocialLoginResponse> => {
    const userResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    if (!userResponse.ok) {
      const errorData = await userResponse.json();
      throw new Error(JSON.stringify(errorData));
    }

    const userData = await userResponse.json();
    return {
      email: userData.kakao_account.email,
    };
  },
};
