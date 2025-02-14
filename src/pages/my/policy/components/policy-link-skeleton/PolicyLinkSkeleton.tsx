import Skeleton from "@/components/skeleton/Skeleton";
import styles from "./PolicyLinkSkeleton.module.scss";

export default function PolicyLinkSkeleton() {
  return (
    <Skeleton className={styles.container}>
      <div>
        <Skeleton
          width={18}
          height={2.2}
          borderRadius={1}
          backgroundColor="skeleton_2"
        />
        <Skeleton
          width={10}
          height={2.2}
          borderRadius={1}
          style={{ marginTop: "0.6rem" }}
          backgroundColor="skeleton_2"
        />
      </div>
      <Skeleton
        width={2.8}
        height={2.8}
        borderRadius={1}
        backgroundColor="skeleton_2"
      />
    </Skeleton>
  );
}
