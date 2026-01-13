import { SocialLoginResponse } from "./socialType";

// 개발 환경에서는 프록시 경로 사용, 프로덕션에서는 직접 URL 사용
const isDev = import.meta.env.DEV;
const KAKAO_AUTH_URL = isDev
  ? "/oauth/kakao/token"
  : "https://kauth.kakao.com/oauth/token";
const KAKAO_API_URL = isDev
  ? "/api/kakao/v2/user/me"
  : "https://kapi.kakao.com/v2/user/me";

export const kakaoLoginService = {
  getToken: async ({ code }: { code: string }): Promise<string> => {
    const tokenResponse = await fetch(KAKAO_AUTH_URL, {
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

  getUserInfo: async ({
    accessToken,
  }: {
    accessToken: string;
  }): Promise<SocialLoginResponse> => {
    const userResponse = await fetch(KAKAO_API_URL, {
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
