import Skeleton from "@/components/skeleton/Skeleton";

function TraineeRevenueListSkeleton() {
  return (
    <div style={{ marginTop: "3.5rem" }}>
      <Skeleton
        width={6.4}
        height={2.2}
        borderRadius={1}
        style={{ marginBottom: "0.8rem" }}
      />
      {Array.from({ length: 10 }).map(() => (
        <Skeleton
          height={9}
          style={{
            margin: "0 -1.8rem",
            padding: "2rem 1.8rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Skeleton
              width={9.3}
              height={2.2}
              borderRadius={1}
              backgroundColor="skeleton_2"
            />
            <Skeleton
              width={17}
              height={2.2}
              borderRadius={1}
              backgroundColor="skeleton_2"
              style={{ marginTop: "0.6rem" }}
            />
          </div>
          <Skeleton
            width={13}
            height={2.2}
            borderRadius={1}
            backgroundColor="skeleton_2"
          />
        </Skeleton>
      ))}
    </div>
  );
}

export default TraineeRevenueListSkeleton;
