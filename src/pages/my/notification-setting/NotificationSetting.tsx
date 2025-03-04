import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import SwitchSection from "./components/SwitchSection";
import styles from "./NotificationSetting.module.scss";
import { useGetUserPushs } from "@/api/generated/푸시/푸시";

export default function NotificationSetting() {
  const centerId = useUserStore((state) => state.selectedCenter.centerId);
  const { data: userPushs } = useGetUserPushs(
    {
      centerId: centerId || "",
      currentPageNo: "1",
      recordsPerPage: "10",
    },
    { query: { enabled: !!centerId } }
  );

  console.log(userPushs);
  const notificationSettingArr = [
    {
      title: "일반 알림",
      isSwitchOn: true,
    },
    {
      title: "수업 스케쥴 알림",
      isSwitchOn: true,
    },
    {
      title: "마케팅 알림",
      isSwitchOn: true,
    },
  ];

  return (
    <PaddingContainer>
      <div className={styles.container}>
        {notificationSettingArr.map((notification) => (
          <SwitchSection notification={notification} />
        ))}
      </div>
    </PaddingContainer>
  );
}
