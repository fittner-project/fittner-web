import styles from "./Center.module.scss";
import { openBottomSheet } from "@/utils/bottomSheet";
import ApprovalNoticeBottomSheet from "../approval-notice-bottom-sheet/ApprovalNoticeBottomSheet";
import { CenterListResDto } from "@/api/generated/models";

interface CenterProps {
  isConnected: boolean;
  center: CenterListResDto;
}

export default function Center({ isConnected, center }: CenterProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className={styles.container}>
      <section className={styles.center_info}>
        <p className={styles.center_name}>{center?.centerName}</p>
        <p className={styles.center_address}>{center?.centerAddress}</p>
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
