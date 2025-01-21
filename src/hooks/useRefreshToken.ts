import { useMakeAccessToken } from "@/api/generated/권한/권한";
import useAuthStore from "@/store/auth";
import { useEffect } from "react";

export default function useRefreshToken() {
  const {
    isAuthenticated,
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
  } = useAuthStore();
  const { mutate: makeAccessToken } = useMakeAccessToken({
    mutation: {
      onSuccess: (data) => {
        if (data.result?.accessToken && data.result?.refreshTokenId) {
          setAccessToken(data.result?.accessToken);
          setRefreshToken(data.result?.refreshTokenId);
        }
      },
    },
  });

  useEffect(() => {
    const refresh = () => {
      if (isAuthenticated && accessToken && refreshToken) {
        makeAccessToken({
          data: { accessToken: accessToken, refreshTokenId: refreshToken },
        });

        const intervalId = setInterval(
          () => {
            makeAccessToken({
              data: { accessToken: accessToken, refreshTokenId: refreshToken },
            });
          },
          1000 * 60 * 5
        );

        return () => clearInterval(intervalId);
      }
    };

    refresh();
  }, [isAuthenticated, accessToken, refreshToken]);
}
