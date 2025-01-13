import { useState, useEffect } from "react";

function useResolutionRatio(targetRatio = 0.47368421052) {
  const [isBreakPoint, setIsBreakPoint] = useState(true);

  useEffect(() => {
    const updateVisibility = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const currentRatio = width / height;

      setIsBreakPoint(currentRatio >= targetRatio);
    };

    updateVisibility();

    window.addEventListener("resize", updateVisibility);
    return () => window.removeEventListener("resize", updateVisibility);
  }, [targetRatio]);

  return isBreakPoint;
}

export default useResolutionRatio;
