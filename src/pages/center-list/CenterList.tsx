import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import styles from "./CenterList.module.scss";
import useAuthStore from "@/store/auth";
import Center from "./components/center/Center";
import { openBottomSheet } from "@/utils/bottomSheet";
import ApprovalNoticeBottomSheet from "./components/approval-notice-bottom-sheet/ApprovalNoticeBottomSheet";

export default function CenterList() {
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      openBottomSheet({
        component: ApprovalNoticeBottomSheet,
      });
    }
  }, [isAuthenticated]);

  return (
    <PaddingContainer>
      <div className={styles.container}>
        <div style={{ width: "100%" }}>
          <p className={styles.title}>연동 승인중</p>
          <div className={styles.center_list}>
            <Center isConnected={false} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            flex: 1,
          }}
        >
          <p className={styles.title}>연동 완료</p>
          {isAuthenticated && (
            <div className={styles.center_list}>
              <Center isConnected={true} />
            </div>
          )}

          {!isAuthenticated && (
            <div className={styles.no_center_container}>
              <p className={styles.no_center_text}>연동된 센터가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </PaddingContainer>
  );
}
