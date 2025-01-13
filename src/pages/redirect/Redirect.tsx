import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLogin } from "@/api/generated/auth-controller/auth-controller";
import styles from "./Redirect.module.scss";

function SocialCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const state = searchParams.get("state");
  const code = searchParams.get("code");

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

  useEffect(() => {
    const getKakaoEmail = async () => {
      try {
        const tokenResponse = await fetch(
          "https://kauth.kakao.com/oauth/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            body: new URLSearchParams({
              grant_type: "authorization_code",
              client_id: import.meta.env.VITE_KAKAO_CLIENT_ID,
              redirect_uri: import.meta.env.VITE_REDIRECT_URI,
              code: code || "",
            }),
          }
        );

        if (!tokenResponse.ok) {
          const errorData = await tokenResponse.json();
          throw new Error(JSON.stringify(errorData));
        }

        const tokenData = await tokenResponse.json();
        console.log("토큰 응답:", tokenData);

        const userResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        });

        if (!userResponse.ok) {
          const errorData = await userResponse.json();
          throw new Error(JSON.stringify(errorData));
        }

        const userData = await userResponse.json();
        console.log("사용자 정보:", userData);

        const email = userData.kakao_account.email;

        login({ data: { trainerEmail: email } });
      } catch (error) {
        console.error("카카오 로그인 처리 실패:", error);
        navigate("/sign-in");
      }
    };

    if (state === "kakao" && code) {
      getKakaoEmail();
    }
  }, [code, state, navigate, login]);

  return (
    <div className={styles.container}>
      <p className={styles.loading_text}>로그인 중...</p>
    </div>
  );
}

export default SocialCallback;
