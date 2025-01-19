import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./SignOutBottomSheet.module.scss";
import Button from "@/components/button/Button";
import { closeBottomSheet } from "@/utils/bottomSheet";

export default function SignOutBottomSheet() {
  return (
    <BottomSheet>
      <div className={styles.container}>
        <p className={styles.title}>
          <span className={styles.sign_out}>로그아웃</span> 하시겠습니까?
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
            로그아웃
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}
