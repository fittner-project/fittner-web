import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "./Redirect.module.scss";

import { SocialType } from "@/auth/socialType";
import { useSocialAuth } from "../sign-in/hooks/useSocialAuth";

function SocialCallback() {
  const [searchParams] = useSearchParams();
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  const { handleSocialCallback } = useSocialAuth();

  useEffect(() => {
    if (state && code) {
      handleSocialCallback({ socialType: state as SocialType, code });
    }
  }, [state, code, handleSocialCallback]);

  return (
    <div className={styles.container}>
      <p className={styles.loading_text}>로그인 중...</p>
    </div>
  );
}

export default SocialCallback;
