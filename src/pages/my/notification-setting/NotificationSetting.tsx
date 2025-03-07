import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import SwitchSection from "./components/SwitchSection";
import styles from "./NotificationSetting.module.scss";
import { useGetUserPushs } from "@/api/generated/푸시/푸시";
import Skeleton from "@/components/skeleton/Skeleton";

export default function NotificationSetting() {
  const centerId = useUserStore((state) => state.selectedCenter.centerId);
  const { data: userPushData, isLoading } = useGetUserPushs(
    {
      centerId: centerId || "",
    },
    { query: { enabled: !!centerId } }
  );

  const userPushsData = userPushData?.result;

  return (
    <PaddingContainer>
      <div className={styles.container}>
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <Skeleton
                key={index}
                height={6.8}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "0 -1.8rem",
                  padding: "0 1.8rem",
                }}
              >
                <Skeleton
                  width={8}
                  height={3}
                  borderRadius={1}
                  backgroundColor="skeleton_2"
                />
                <Skeleton
                  width={5}
                  height={3}
                  borderRadius={1000}
                  backgroundColor="skeleton_2"
                />
              </Skeleton>
            ))
          : userPushsData?.map((notification) => (
              <SwitchSection notification={notification} />
            ))}
      </div>
    </PaddingContainer>
  );
}
