import { useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PATH from "@/router/path";
import {
  FcmNotificationData,
  FcmNotificationEvent,
  addFcmNotificationListener,
  addFcmDeviceEventListener,
  parseFcmNotificationData,
  logFcmNotification,
} from "@/utils/fcmWebView";
import { setupFcmNotificationHandler } from "@/utils/reactNativeBridge";

/**
 * FCM 푸시 메시지 네비게이션을 처리하는 훅
 * React Native 웹뷰에서 전달되는 FCM 알림 이벤트를 수신하고 URL 기반으로 페이지를 리다이렉트
 */
export default function useFcmNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  // URL로 이동하는 함수 (서버에서 받은 URL 처리)
  const navigateToUrl = useCallback(
    (url: string) => {
      try {
        logFcmNotification(`FCM URL 네비게이션: ${url}`);

        // 현재 경로와 동일한 경우 무시
        if (location.pathname === url) {
          logFcmNotification("현재 경로와 동일하여 네비게이션 무시:", url);
          return;
        }

        // 상대 URL인 경우 현재 도메인 내에서 이동
        if (url.startsWith("/")) {
          logFcmNotification(`상대 URL로 이동: ${url}`);
          navigate(url);
          return;
        }

        // 상대 경로인 경우 현재 경로 기준으로 이동
        logFcmNotification(`상대 경로로 이동: ${url}`);
        navigate(url);
      } catch (error) {
        console.error("URL 네비게이션 실패:", error);
      }
    },
    [navigate, location.pathname]
  );

  // FCM 알림 데이터를 처리하는 함수 (URL 기반)
  const handleFcmNotification = useCallback(
    (data: FcmNotificationData) => {
      try {
        logFcmNotification("FCM 알림 데이터 처리:", data);

        // 서버에서 항상 URL을 내려주므로 URL 기반으로만 처리
        if (data.url) {
          logFcmNotification(`서버에서 받은 URL로 이동: ${data.url}`);
          navigateToUrl(data.url);
        } else {
          logFcmNotification("URL이 없어서 홈으로 이동:", data);
          // URL이 없는 경우 홈으로 이동
          navigateToUrl(PATH.HOME);
        }
      } catch (error) {
        console.error("FCM 알림 데이터 처리 실패:", error);
      }
    },
    [navigateToUrl]
  );

  // CustomEvent 리스너 (웹뷰에서 전달되는 이벤트)
  const handleCustomEvent = useCallback(
    (event: FcmNotificationEvent) => {
      logFcmNotification("CustomEvent로 FCM 알림 수신:", event);
      const parsedData = parseFcmNotificationData(event.data);
      if (parsedData) {
        handleFcmNotification(parsedData);
      }
    },
    [handleFcmNotification]
  );

  // DeviceEventEmitter 리스너 (React Native에서 전달되는 이벤트)
  const handleDeviceEvent = useCallback(
    (event: FcmNotificationEvent) => {
      logFcmNotification("DeviceEventEmitter로 FCM 알림 수신:", event);
      const parsedData = parseFcmNotificationData(event.data);
      if (parsedData) {
        handleFcmNotification(parsedData);
      }
    },
    [handleFcmNotification]
  );

  // 이벤트 리스너 설정
  useEffect(() => {
    // CustomEvent 리스너 등록 (fcm-notification-click 이벤트 포함)
    const removeCustomEventListener =
      addFcmNotificationListener(handleCustomEvent);

    // DeviceEventEmitter 리스너 등록 (React Native 환경에서만)
    const removeDeviceEventListener =
      addFcmDeviceEventListener(handleDeviceEvent);

    // React Native 브리지 핸들러 등록
    const removeReactNativeHandler = setupFcmNotificationHandler(
      (data: any) => {
        logFcmNotification("React Native 브리지로 FCM 알림 수신:", data);
        const parsedData = parseFcmNotificationData(data);
        if (parsedData) {
          handleFcmNotification(parsedData);
        }
      }
    );

    // React Native의 INJECTEDJAVASCRIPT에서 등록한 함수 직접 처리
    const handleNativeFcmNotification = (data: any) => {
      logFcmNotification(
        "React Native INJECTEDJAVASCRIPT로 FCM 알림 수신:",
        data
      );
      const parsedData = parseFcmNotificationData(data);
      if (parsedData) {
        handleFcmNotification(parsedData);
      }
    };

    // 전역 함수 등록
    if (typeof window !== "undefined") {
      (window as any).onNativeFcmNotification = handleNativeFcmNotification;
    }

    // 정리 함수
    return () => {
      removeCustomEventListener();
      removeDeviceEventListener();
      removeReactNativeHandler();
      if (typeof window !== "undefined") {
        delete (window as any).onNativeFcmNotification;
      }
    };
  }, [handleCustomEvent, handleDeviceEvent, handleFcmNotification]);

  // 디버깅을 위한 수동 테스트 함수들 (개발 환경에서만)
  const testNavigation = useCallback(() => {
    if (process.env.NODE_ENV === "development") {
      logFcmNotification("FCM URL 네비게이션 테스트");

      // URL 기반 테스트
      const testEvent = new CustomEvent("fcm-notification-click", {
        detail: {
          data: {
            url: "/my/notice/테스트공지?content=테스트내용&date=20250124",
          },
          timestamp: Date.now(),
        },
      });

      window.dispatchEvent(testEvent);
    }
  }, []);

  // React Native 브리지 테스트 함수
  const testReactNativeBridge = useCallback(() => {
    if (process.env.NODE_ENV === "development") {
      logFcmNotification("React Native 브리지 테스트");

      // React Native INJECTEDJAVASCRIPT 함수 호출 시뮬레이션
      if (
        typeof window !== "undefined" &&
        (window as any).onNativeFcmNotification
      ) {
        (window as any).onNativeFcmNotification({
          url: "/my/notice/브리지테스트?content=브리지내용&date=20250124",
        });
      }
    }
  }, []);

  // fcm-notification-click 이벤트 테스트 함수
  const testFcmNotificationClick = useCallback(() => {
    if (process.env.NODE_ENV === "development") {
      logFcmNotification("fcm-notification-click 이벤트 테스트");

      // React Native에서 보내는 이벤트 시뮬레이션
      const testEvent = new CustomEvent("fcm-notification-click", {
        detail: {
          data: {
            url: "/my/notice/이벤트테스트?content=이벤트내용&date=20250124",
          },
          timestamp: Date.now(),
        },
      });

      window.dispatchEvent(testEvent);
    }
  }, []);

  // 현재 경로 테스트 함수
  const testCurrentPath = useCallback(() => {
    if (process.env.NODE_ENV === "development") {
      logFcmNotification(`현재 경로: ${location.pathname}`);
      logFcmNotification(`현재 경로와 동일한 URL 테스트: ${location.pathname}`);

      // 현재 경로와 동일한 URL로 테스트 (무시되어야 함)
      const testEvent = new CustomEvent("fcm-notification-click", {
        detail: {
          data: {
            url: location.pathname,
          },
          timestamp: Date.now(),
        },
      });

      window.dispatchEvent(testEvent);
    }
  }, [location.pathname]);

  return {
    handleFcmNotification,
    navigateToUrl,
    testNavigation,
    testReactNativeBridge,
    testFcmNotificationClick,
    testCurrentPath,
  };
}
