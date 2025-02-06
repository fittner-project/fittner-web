import Skeleton from "@/components/skeleton/Skeleton";
import styles from "./CenterSkeleton.module.scss";

export default function CenterSkeleton() {
  return (
    <Skeleton className={styles.container}>
      <div className={styles.center_skeleton_left}>
        <Skeleton
          width={10}
          height={2.2}
          borderRadius={1}
          backgroundColor="skeleton_2"
        />
        <Skeleton
          width={17.5}
          height={2.2}
          borderRadius={1}
          backgroundColor="skeleton_2"
        />
      </div>
      <Skeleton
        width={9.337}
        height={3.6}
        borderRadius={10}
        backgroundColor="skeleton_2"
      />
    </Skeleton>
  );
}
