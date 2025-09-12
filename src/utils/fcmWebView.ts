/**
 * FCM 웹뷰 통신을 위한 유틸리티 함수들
 * React Native 웹뷰와의 FCM 알림 데이터 교환을 담당
 */

export interface FcmNotificationData {
  url?: string;
  screen?: string;
  params?: Record<string, any>;
  action?: string;
  [key: string]: any;
}

export interface FcmNotificationEvent {
  data: FcmNotificationData;
  timestamp: number;
}

/**
 * 웹뷰에서 FCM 알림 데이터를 전달하는 이벤트 발생
 * React Native에서 웹뷰로 알림 데이터를 전달할 때 사용
 */
export const sendFcmNotificationToWebView = (
  data: FcmNotificationData
): void => {
  try {
    const event = new CustomEvent("fcmNotificationClick", {
      detail: {
        data,
        timestamp: Date.now(),
      },
    });

    if (typeof window !== "undefined") {
      window.dispatchEvent(event);
      console.log("웹뷰에 FCM 알림 데이터 전달 완료:", data);
    }
  } catch (error) {
    console.error("웹뷰로 FCM 알림 데이터 전달 실패:", error);
  }
};

/**
 * 웹뷰에서 FCM 알림 이벤트 리스너 등록
 * @param handler 알림 데이터를 처리할 핸들러 함수
 * @returns 정리 함수
 */
export const addFcmNotificationListener = (
  handler: (event: FcmNotificationEvent) => void
): (() => void) => {
  const eventHandler = (event: Event) => {
    const customEvent = event as CustomEvent<FcmNotificationEvent>;
    handler(customEvent.detail);
  };

  if (typeof window !== "undefined") {
    // React Native에서 보내는 fcm-notification-click 이벤트 리스너
    window.addEventListener("fcm-notification-click", eventHandler);
    // 기존 fcmNotificationClick 이벤트도 지원
    window.addEventListener("fcmNotificationClick", eventHandler);
  }

  return () => {
    if (typeof window !== "undefined") {
      window.removeEventListener("fcm-notification-click", eventHandler);
      window.removeEventListener("fcmNotificationClick", eventHandler);
    }
  };
};

/**
 * React Native 웹뷰에서 FCM 알림을 받기 위한 리스너 등록
 * @param handler 알림 데이터를 처리할 핸들러 함수
 * @returns 정리 함수
 */
export const addFcmDeviceEventListener = (
  handler: (event: FcmNotificationEvent) => void
): (() => void) => {
  // React Native 웹뷰에서 전달되는 메시지 처리
  const messageHandler = (event: MessageEvent) => {
    try {
      let messageData;

      // JSON 문자열인 경우 파싱
      if (typeof event.data === "string") {
        try {
          messageData = JSON.parse(event.data);
        } catch {
          return; // JSON이 아닌 경우 무시
        }
      } else if (typeof event.data === "object") {
        messageData = event.data;
      } else {
        return;
      }

      // FCM 알림 메시지인지 확인
      if (messageData && messageData.type === "fcmNotificationClick") {
        logFcmNotification("postMessage로 FCM 알림 수신:", messageData);
        handler({
          data: messageData.data,
          timestamp: messageData.timestamp || Date.now(),
        });
      }
    } catch (error) {
      console.error("postMessage 이벤트 처리 실패:", error);
    }
  };

  // React Native 웹뷰 환경 확인 및 이벤트 리스너 등록
  if (typeof window !== "undefined") {
    // postMessage 이벤트 리스너 등록
    window.addEventListener("message", messageHandler);

    // React Native에서 직접 호출할 수 있는 전역 함수 등록
    (window as any).onFcmNotification = (data: any) => {
      logFcmNotification("전역 함수로 FCM 알림 수신:", data);
      handler({
        data: data,
        timestamp: Date.now(),
      });
    };

    // React Native의 INJECTEDJAVASCRIPT에서 사용하는 함수명과 일치하도록 등록
    (window as any).onNativeFcmNotification = (data: any) => {
      logFcmNotification("React Native 전역 함수로 FCM 알림 수신:", data);
      handler({
        data: data,
        timestamp: Date.now(),
      });
    };
  }

  return () => {
    if (typeof window !== "undefined") {
      window.removeEventListener("message", messageHandler);
      delete (window as any).onFcmNotification;
      delete (window as any).onNativeFcmNotification;
    }
  };
};

/**
 * FCM 알림 데이터 유효성 검사
 * @param data 검사할 알림 데이터
 * @returns 유효한 데이터인지 여부
 */
export const isValidFcmNotificationData = (
  data: any
): data is FcmNotificationData => {
  return (
    data && typeof data === "object" && (data.url || data.screen || data.action)
  );
};

/**
 * FCM 알림 데이터를 안전하게 파싱
 * @param rawData 원본 데이터
 * @returns 파싱된 FCM 알림 데이터 또는 null
 */
export const parseFcmNotificationData = (
  rawData: any
): FcmNotificationData | null => {
  try {
    if (!rawData || typeof rawData !== "object") {
      return null;
    }

    const data: FcmNotificationData = {};

    if (typeof rawData.url === "string") {
      data.url = rawData.url;
    }

    if (typeof rawData.screen === "string") {
      data.screen = rawData.screen;
    }

    if (rawData.params && typeof rawData.params === "object") {
      data.params = rawData.params;
    }

    if (typeof rawData.action === "string") {
      data.action = rawData.action;
    }

    // 추가 데이터 복사
    Object.keys(rawData).forEach((key) => {
      if (!["url", "screen", "params", "action"].includes(key)) {
        data[key] = rawData[key];
      }
    });

    return isValidFcmNotificationData(data) ? data : null;
  } catch (error) {
    console.error("FCM 알림 데이터 파싱 실패:", error);
    return null;
  }
};

/**
 * 개발 환경에서 FCM 알림 테스트를 위한 함수
 * @param data 테스트할 알림 데이터
 */
export const testFcmNotification = (data: FcmNotificationData): void => {
  if (process.env.NODE_ENV === "development") {
    console.log("FCM 알림 테스트:", data);
    sendFcmNotificationToWebView(data);
  }
};

/**
 * FCM 알림 로깅을 위한 함수
 * @param message 로그 메시지
 * @param data 로그할 데이터
 */
export const logFcmNotification = (message: string, data?: any): void => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[FCM] ${message}`, data);
  }
};
