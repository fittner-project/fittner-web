import useAuthStore from "@/store/auth";
import styles from "./Center.module.scss";
import { openBottomSheet } from "@/utils/bottomSheet";
import ApprovalNoticeBottomSheet from "../approval-notice-bottom-sheet/ApprovalNoticeBottomSheet";
import { storageKeys } from "@/constants/storageKeys";
import { storage } from "@/utils/storage";
import { CenterListResDto } from "@/api/generated/models";

interface CenterProps {
  isConnected: boolean;
}

export default function Center({ isConnected }: CenterProps) {
  const { isAuthenticated } = useAuthStore();
  const initialCenter = storage.get<CenterListResDto>({
    key: storageKeys.initialCenter,
  });

  return (
    <div className={styles.container}>
      <section className={styles.center_info}>
        <p className={styles.center_name}>{initialCenter?.centerName}</p>
        <p className={styles.center_address}>{initialCenter?.centerAddress}</p>
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
