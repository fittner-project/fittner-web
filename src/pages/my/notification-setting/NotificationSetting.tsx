import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import SwitchSection from "./components/SwitchSection";
import styles from "./NotificationSetting.module.scss";
import { useGetUserPushs } from "@/api/generated/푸시/푸시";

export default function NotificationSetting() {
  const centerId = useUserStore((state) => state.selectedCenter.centerId);
  const { data: userPushData } = useGetUserPushs(
    {
      centerId: centerId || "",
    },
    { query: { enabled: !!centerId } }
  );

  const userPushsData = userPushData?.result;

  return (
    <PaddingContainer>
      <div className={styles.container}>
        {userPushsData?.map((notification) => (
          <SwitchSection notification={notification} />
        ))}
      </div>
    </PaddingContainer>
  );
}
