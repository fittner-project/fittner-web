/**
 * React Native와 웹뷰 간의 브리지 통신을 위한 유틸리티
 */

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
    onFcmNotification?: (data: any) => void;
    onNativeFcmToken?: (token: string) => void;
  }
}

/**
 * React Native 웹뷰 환경인지 확인
 */
export const isReactNativeWebView = (): boolean => {
  return typeof window !== "undefined" && !!window.ReactNativeWebView;
};

/**
 * React Native로 메시지 전송
 * @param message 전송할 메시지
 */
export const sendMessageToReactNative = (message: any): void => {
  if (isReactNativeWebView()) {
    try {
      window.ReactNativeWebView!.postMessage(JSON.stringify(message));
      console.log("React Native로 메시지 전송:", message);
    } catch (error) {
      console.error("React Native로 메시지 전송 실패:", error);
    }
  } else {
    console.log("React Native 웹뷰 환경이 아님");
  }
};

/**
 * React Native에서 FCM 알림 데이터를 받기 위한 전역 함수 등록
 * @param handler 알림 데이터를 처리할 핸들러 함수
 * @returns 정리 함수
 */
export const setupFcmNotificationHandler = (
  handler: (data: any) => void
): (() => void) => {
  if (typeof window !== "undefined") {
    window.onFcmNotification = (data: any) => {
      console.log("React Native에서 FCM 알림 수신:", data);
      handler(data);
    };
  }

  return () => {
    if (typeof window !== "undefined") {
      delete window.onFcmNotification;
    }
  };
};

/**
 * React Native에서 FCM 토큰을 받기 위한 전역 함수 등록
 * @param handler 토큰을 처리할 핸들러 함수
 * @returns 정리 함수
 */
export const setupFcmTokenHandler = (
  handler: (token: string) => void
): (() => void) => {
  if (typeof window !== "undefined") {
    window.onNativeFcmToken = (token: string) => {
      console.log("React Native에서 FCM 토큰 수신:", token);
      handler(token);
    };
  }

  return () => {
    if (typeof window !== "undefined") {
      delete window.onNativeFcmToken;
    }
  };
};
