import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";

import styles from "./Redirect.module.scss";

import { SocialType } from "@/auth/socialType";
import { useSocialAuth } from "../sign-in/hooks/useSocialAuth";

function SocialCallback() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { handleSocialCallback } = useSocialAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        setIsProcessing(true);

        let state = searchParams.get("state");
        let code = searchParams.get("code");

        if (!state && !code && location.search === "") {
          const urlParams = new URLSearchParams(location.search);
          state = urlParams.get("state");
          code = urlParams.get("code");
        }

        if (state && code) {
          await handleSocialCallback({
            socialType: state as SocialType,
            code,
          });
        } else {
          console.error("Missing state or code");
        }
      } catch (error) {
        console.error("Callback handling failed:", error);
      } finally {
        setIsProcessing(false);
      }
    };

    handleCallback();
  }, [searchParams, location, handleSocialCallback]);

  return (
    <div className={styles.container}>
      <p className={styles.loading_text}>
        {isProcessing ? "로그인 중..." : "잠시만 기다려주세요..."}
      </p>
    </div>
  );
}

export default SocialCallback;
