import { useEffect, useCallback } from "react";
import useAppStore from "@/store/app";

/**
 * 뒤로가기 함수를 주입하고 언마운트 시 정리하는 훅
 * @param callback 뒤로가기 시 실행할 함수
 */
const useHandleBackInject = (callback: () => void, deps?: unknown[]) => {
  const { setInjectedBackFunction } = useAppStore();

  // callback을 메모이제이션
  const memoizedCallback = useCallback(callback, [callback]);

  useEffect(() => {
    // 뒤로가기 함수 주입
    setInjectedBackFunction(memoizedCallback);

    // cleanup: 컴포넌트 언마운트 시 주입된 함수 제거
    return () => {
      setInjectedBackFunction(null);
    };
  }, deps ?? []);
};

export default useHandleBackInject;
