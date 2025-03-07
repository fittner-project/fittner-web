import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import SwitchSection from "./components/SwitchSection";
import styles from "./NotificationSetting.module.scss";

import Skeleton from "@/components/skeleton/Skeleton";
import { useGetUserMyPagePush } from "@/api/generated/마이페이지/마이페이지";

export default function NotificationSetting() {
  const { data: userPushData, isLoading } = useGetUserMyPagePush();

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
