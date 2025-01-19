import { useEffect, useState } from "react";
import styles from "./Progress.module.scss";
import classNames from "classnames";

interface ProgressProps {
  current: number;
  total: number;
  width?: string | number;
  height?: string | number;
  fullWidth?: boolean;
  className?: string;
}

function Progress({
  current,
  total,
  width,
  height = 0.9,
  fullWidth = false,
  className,
}: ProgressProps) {
  const [progress, setProgress] = useState(0);
  const targetProgress = current / total;

  useEffect(() => {
    setProgress(targetProgress);
  }, [current, total]);

  return (
    <progress
      value={progress}
      max={1}
      className={classNames(styles.progress, className)}
      style={{
        height: typeof height === "number" ? `${height}rem` : height,
        width: typeof width === "number" ? `${width}rem` : width,
        ...(fullWidth && { width: "100%" }),
      }}
    />
  );
}

export default Progress;
