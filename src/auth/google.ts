import { SocialLoginResponse } from "./socialType";

// 개발 환경에서는 프록시 경로 사용, 프로덕션에서는 직접 URL 사용
const isDev = import.meta.env.DEV;
const GOOGLE_AUTH_URL = isDev
  ? "/oauth/google/token"
  : "https://oauth2.googleapis.com/token";
const GOOGLE_API_URL = isDev
  ? "/api/google/oauth2/v2/userinfo"
  : "https://www.googleapis.com/oauth2/v2/userinfo";

export const googleLoginService = {
  getToken: async ({ code }: { code: string }): Promise<string> => {
    const tokenResponse = await fetch(GOOGLE_AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
        redirect_uri: import.meta.env.VITE_REDIRECT_URI,
        grant_type: "authorization_code",
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
    const userResponse = await fetch(GOOGLE_API_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      const errorData = await userResponse.json();
      throw new Error(JSON.stringify(errorData));
    }

    const userData = await userResponse.json();
    return {
      email: userData.email,
    };
  },
};
