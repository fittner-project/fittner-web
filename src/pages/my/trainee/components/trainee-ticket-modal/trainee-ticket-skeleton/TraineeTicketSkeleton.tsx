import Skeleton from "@/components/skeleton/Skeleton";

export default function TraineeTicketSkeleton() {
  return (
    <div>
      <Skeleton
        fullWidth
        borderRadius={1.6}
        style={{
          border: "0.2rem solid #f2f2f2",
          padding: "1.6rem 2rem",
          backgroundColor: "white",
        }}
      >
        <Skeleton
          height={2.2}
          width={12}
          borderRadius={0.4}
          backgroundColor="skeleton_2"
        />
        <Skeleton
          height={2.2}
          width={18}
          borderRadius={0.4}
          backgroundColor="skeleton_2"
          style={{ marginTop: "0.8rem" }}
        />
        <div
          style={{
            borderTop: "0.2rem solid #f2f2f2",
            marginTop: "1.5rem",
            paddingTop: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Skeleton
              width={6}
              height={2.2}
              borderRadius={0.4}
              backgroundColor="skeleton_2"
            />
            <Skeleton
              width={10}
              height={2.2}
              borderRadius={0.4}
              backgroundColor="skeleton_2"
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.8rem",
              marginTop: "4rem",
            }}
          >
            <Skeleton
              height={4}
              fullWidth
              borderRadius={1}
              backgroundColor="skeleton_2"
            />
            <Skeleton
              height={4}
              fullWidth
              borderRadius={1}
              backgroundColor="skeleton_2"
            />
          </div>
        </div>
      </Skeleton>

      <Skeleton
        height={5.4}
        fullWidth
        borderRadius={0.8}
        style={{ marginTop: "2.5rem" }}
      />

      <div
        style={{
          marginTop: "1.2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Skeleton
          width={20}
          height={2.2}
          borderRadius={0.4}
          backgroundColor="skeleton_2"
        />
      </div>
    </div>
  );
}
