import styles from "./Center.module.scss";
import { openBottomSheet } from "@/utils/bottomSheet";
import ApprovalNoticeBottomSheet from "../approval-notice-bottom-sheet/ApprovalNoticeBottomSheet";
import { UserCenterListResDto } from "@/api/generated/models";
import CancelApprovalBottomSheet from "../cancel-approval-bottom-sheet/CancelApprovalBottomSheet";
import Image from "@/components/image/Image";
import { pinAngleNor, pinAngleSel } from "@/assets/assets";
import classNames from "classnames";

interface CenterProps {
  isConnected: boolean;
  center: UserCenterListResDto;
}

export default function Center({ isConnected, center }: CenterProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const selectedCenter = useUserStore((state) => state.selectedCenter);
  const isSelectedCenter = selectedCenter.centerName === center.centerName;

  return (
    <div className={styles.container}>
      {isConnected && isAuthenticated && (
        <Image
          src={isSelectedCenter ? pinAngleSel : pinAngleNor}
          style={{
            marginBottom: "auto",
            marginRight: "0.9rem",
            marginLeft: "-1rem",
          }}
        />
      )}
      <section
        className={classNames(styles.center_info, {
          [styles.active]: isConnected && isSelectedCenter && isAuthenticated,
        })}
      >
        <p className={styles.center_name}>{center?.centerName}</p>
        <p className={styles.center_address}>{center?.centerAddress}</p>
      </section>
      <button
        onClick={() => {
          if (!isAuthenticated) {
            openBottomSheet({ component: ApprovalNoticeBottomSheet });
            return;
          }

          // 연동 해제 부분
          if (isConnected) {
            return;
          }

          // 승인 취소 부분
          if (!isConnected) {
            openBottomSheet({
              component: CancelApprovalBottomSheet,
              props: {
                center: center,
              },
            });
          }
        }}
        className={styles.action_button}
      >
        {isConnected ? "연동해제" : "승인취소"}
      </button>
    </div>
  );
}
