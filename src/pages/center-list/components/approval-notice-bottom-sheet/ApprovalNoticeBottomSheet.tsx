import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./ApprovalNoticeBottomSheet.module.scss";
import Button from "@/components/button/Button";
import { closeBottomSheet } from "@/utils/bottomSheet";

export default function ApprovalNoticeBottomSheet() {
  return (
    <BottomSheet>
      <div className={styles.container}>
        <p className={styles.title}>
          <span className={styles.title_highlight}>최종 관리자 승인</span>후{" "}
          <br />
          서비스 이용이 가능합니다
        </p>

        <Button
          onClick={() => closeBottomSheet()}
          backgroundColor="primary_1"
          fullWidth
          className={styles.button}
        >
          확인
        </Button>
      </div>
    </BottomSheet>
  );
}
