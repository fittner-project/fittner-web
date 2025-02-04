import useAuthStore from "@/store/auth";
import styles from "./Center.module.scss";
import { openBottomSheet } from "@/utils/bottomSheet";
import ApprovalNoticeBottomSheet from "../approval-notice-bottom-sheet/ApprovalNoticeBottomSheet";

interface CenterProps {
  isConnected: boolean;
}

export default function Center({ isConnected }: CenterProps) {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className={styles.container}>
      <section className={styles.center_info}>
        <p className={styles.center_name}>고길동피트니스 방배점</p>
        <p className={styles.center_address}>서울시 관악구 신림동 111-22</p>
      </section>
      <button
        onClick={() => {
          if (!isAuthenticated) {
            openBottomSheet({ component: ApprovalNoticeBottomSheet });
          }
        }}
        className={styles.action_button}
      >
        {isConnected ? "연동해제" : "승인취소"}
      </button>
    </div>
  );
}
