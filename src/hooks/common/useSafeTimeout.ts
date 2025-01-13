import { useEffect, useRef } from "react";

const useSafeTimeout = (
  callback: () => void,
  timeout: number,
  deps: readonly unknown[]
) => {
  const timerRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(callback, timeout);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
export default useSafeTimeout;
