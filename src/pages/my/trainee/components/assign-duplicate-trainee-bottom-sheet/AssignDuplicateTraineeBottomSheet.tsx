import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./AssignDuplicateTraineeBottomSheet.module.scss";
import Button from "@/components/button/Button";
import { closeBottomSheet } from "@/utils/bottomSheet";

export default function AssignDuplicateTraineeBottomSheet() {
  return (
    <BottomSheet>
      <div className={styles.container}>
        <p className={styles.title}>
          동일 회원에게는 <br /> <span>양도가 불가합니다</span>
        </p>

        <Button
          onClick={() => closeBottomSheet()}
          backgroundColor="primary_1"
          fullWidth
        >
          확인
        </Button>
      </div>
    </BottomSheet>
  );
}
