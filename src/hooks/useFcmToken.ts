import { useEffect } from "react";
import { useFcmTokenStore } from "@/stores/fcmToken";

declare global {
  interface Window {
    onNativeFcmToken?: (token: string) => void;
  }
}

export default function useFcmToken() {
  const setFcmToken = useFcmTokenStore((s) => s.setFcmToken);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handler = (ev: Event) => {
      const token = (ev as CustomEvent)?.detail?.token ?? "";
      setFcmToken(token);
    };

    window.addEventListener("fcm-token", handler as EventListener);
    window.onNativeFcmToken = (token: string) => setFcmToken(token);

    return () => {
      window.removeEventListener("fcm-token", handler as EventListener);
      delete window.onNativeFcmToken;
    };
  }, [setFcmToken]);
}
