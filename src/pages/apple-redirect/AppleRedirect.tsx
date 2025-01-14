import { useEffect } from "react";
import styles from "./AppleRedirect.module.scss";

function AppleRedirect() {
  useEffect(() => {
    const handleAppleCallback = () => {
      const form = document.querySelector("form");
      if (form) {
        const formData = new FormData(form);
        const code = formData.get("code");
        const state = formData.get("state");

        window.location.href = `/redirect?code=${code}&state=${state}`;
      }
    };

    handleAppleCallback();
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.loading_text}>로그인 중...</p>
    </div>
  );
}

export default AppleRedirect;
