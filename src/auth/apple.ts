import { SocialLoginResponse } from "./socialType";

export const appleLoginService = {
  getToken: async ({ code }: { code: string }): Promise<string> => {
    const tokenResponse = await fetch("https://appleid.apple.com/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        client_id: import.meta.env.VITE_APPLE_CLIENT_ID,
        client_secret: import.meta.env.VITE_APPLE_CLIENT_SECRET,
        redirect_uri: import.meta.env.VITE_REDIRECT_URI,
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
    const tokenParts = accessToken.split(".");
    const payload = JSON.parse(atob(tokenParts[1]));

    return {
      email: payload.email,
    };
  },
};
