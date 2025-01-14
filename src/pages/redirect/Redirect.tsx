import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "./Redirect.module.scss";

import { SocialType } from "@/auth/socialType";
import { useSocialAuth } from "../sign-in/hooks/useSocialAuth";

function SocialCallback() {
  const [searchParams] = useSearchParams();
  const { handleSocialCallback } = useSocialAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAppleCallback = async (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const appleCode = formData.get("code");
    const appleState = formData.get("state");

    if (appleCode && appleState) {
      await handleSocialCallback({
        socialType: appleState as SocialType,
        code: appleCode as string,
      });
    }
  };

  const handleOtherSocialCallback = async (state: string, code: string) => {
    await handleSocialCallback({
      socialType: state as SocialType,
      code,
    });
  };

  useEffect(() => {
    const handleCallback = async () => {
      try {
        setIsProcessing(true);
        const state = searchParams.get("state");
        const code = searchParams.get("code");

        if (location.pathname === "/redirect" && !code && !state) {
          const form = document.querySelector("form");
          if (!form) return;
          await handleAppleCallback(form);
          return;
        }

        if (state && code) {
          await handleOtherSocialCallback(state, code);
        }
      } catch (error) {
        console.error("Callback handling failed:", error);
      } finally {
        setIsProcessing(false);
      }
    };

    handleCallback();
  }, [searchParams, handleSocialCallback]);

  return (
    <div className={styles.container}>
      <p className={styles.loading_text}>
        {isProcessing ? "로그인 중..." : "잠시만 기다려주세요..."}
      </p>
    </div>
  );
}

export default SocialCallback;
