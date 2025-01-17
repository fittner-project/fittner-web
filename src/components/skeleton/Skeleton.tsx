import { PropsWithChildren } from "react";
import styles from "./Skeleton.module.scss";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  fullWidth?: boolean;
  className?: string;
  backgroundColor?: "skeleton_1" | "skeleton_2" | "skeleton_3";
}

function Skeleton({
  width,
  height,
  borderRadius,
  fullWidth,
  className,
  children,
  backgroundColor = "skeleton_1",
}: PropsWithChildren<SkeletonProps>) {
  const colorStyle = {
    skeleton_1: "#f2f2f2",
    skeleton_2: "#e5e5e5",
    skeleton_3: "#d9d9d9",
  };

  const skeletonColor = colorStyle[backgroundColor];

  return (
    <div
      className={`${styles.container} ${className}`}
      style={{
        width: typeof width === "number" ? `${width}rem` : width,
        height: typeof height === "number" ? `${height}rem` : height,
        borderRadius:
          typeof borderRadius === "number"
            ? `${borderRadius}rem`
            : borderRadius,
        ...(fullWidth && { width: "100%" }),
        backgroundColor: skeletonColor,
      }}
    >
      {children}
    </div>
  );
}

export default Skeleton;
