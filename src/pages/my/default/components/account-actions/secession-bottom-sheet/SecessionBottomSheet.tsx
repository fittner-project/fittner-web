import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./SecessionBottomSheet.module.scss";
import Button from "@/components/button/Button";
import { closeBottomSheet } from "@/utils/bottomSheet";

export default function SecessionBottomSheet() {
  return (
    <BottomSheet>
      <div className={styles.container}>
        <p className={styles.title}>
          <span className={styles.secession}>탈퇴</span> 하시겠습니까?
        </p>
        <div className={styles.button_container}>
          <Button
            onClick={() => closeBottomSheet()}
            backgroundColor="grey_1"
            fullWidth
          >
            취소
          </Button>
          <Button backgroundColor="primary_1" fullWidth>
            탈퇴
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}
