import styles from "./Skeleton.module.scss";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  fullWidth?: boolean;
  className?: string;
}

function Skeleton({
  width,
  height,
  borderRadius,
  fullWidth,
  className,
}: SkeletonProps) {
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
      }}
    />
  );
}

export default Skeleton;
