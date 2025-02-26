import Skeleton from "@/components/skeleton/Skeleton";

export default function SignatureDetailSkeleton() {
  return (
    <Skeleton
      width="100%"
      height={4.1}
      borderRadius={1}
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0.8rem 1.4rem",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "2.2rem",
          alignItems: "center",
        }}
      >
        <Skeleton
          width={2.5}
          height={2.5}
          borderRadius={100}
          backgroundColor="skeleton_2"
        />
        <Skeleton
          width={16.5}
          height={2.2}
          borderRadius={1}
          backgroundColor="skeleton_2"
        />
      </div>
      <Skeleton
        width={3.8}
        height={2.2}
        borderRadius={1}
        backgroundColor="skeleton_2"
      />
    </Skeleton>
  );
}
