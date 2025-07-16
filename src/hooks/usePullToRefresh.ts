import PATH from "@/router/path";
import { WaitForSeconds } from "@/utils/coroutine";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function usePullToRefresh() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);
  const isPulling = useRef<boolean>(false);
  const queryClient = useQueryClient();
  const containerRef = useRef<HTMLDivElement>(null);

  const pathToExclude = [
    PATH.REGISTER_LESSON,
    PATH.REGISTER_TRAINEE,
    PATH.ASSIGN_NEW_TRAINEE,
    PATH.EXTRA_REGISTER_TICKET,
    PATH.PAUSE_TICKET,
    PATH.MY.TRAINEE_OR_TRAINER,
    PATH.MY.TICKET.DEFAULT,
    PATH.MY_LESSONS,
  ];

  const handleTouchStart = (e: TouchEvent) => {
    const shouldExclude = pathToExclude.some((path) =>
      location.pathname.startsWith(path.replace(/:\w+/g, ""))
    );
    if (window.scrollY === 0 && !shouldExclude) {
      startY.current = e.touches[0].clientY;
      isPulling.current = true;
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isPulling.current) return;

    currentY.current = e.touches[0].clientY;
    const distance = currentY.current - startY.current;

    if (distance > 0 && window.scrollY === 0) {
      const pullAmount = Math.min(distance * 0.5, 100);
      setPullDistance(pullAmount);

      if (pullAmount > 10) {
        e.preventDefault();
      }
    }
  };

  const handleTouchEnd = async () => {
    if (!isPulling.current) return;

    if (pullDistance > 50) {
      setIsRefreshing(true);
      queryClient.invalidateQueries();

      await WaitForSeconds(1);
      setIsRefreshing(false);
    }

    setPullDistance(0);
    isPulling.current = false;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [pullDistance]);

  return {
    isRefreshing,
    pullDistance,
    containerRef,
    isPulling,
  };
}

export default usePullToRefresh;
