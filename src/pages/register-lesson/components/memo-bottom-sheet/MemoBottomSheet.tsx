import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./MemoBottomSheet.module.scss";

function MemoBottomSheet() {
  return (
    <BottomSheet>
      <div className={styles.container}>
        <textarea placeholder="메모를 입력해주세요." autoFocus />
      </div>
    </BottomSheet>
  );
}

export default MemoBottomSheet;
