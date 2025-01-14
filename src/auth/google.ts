import { SocialLoginResponse } from "./socialType";

export const googleLoginService = {
  getToken: async ({ code }: { code: string }): Promise<string> => {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
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
    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

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
