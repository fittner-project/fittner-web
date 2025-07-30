import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./MemoBottomSheet.module.scss";
import useRegisterLessonValuesStore from "../../stores/registerLessonValues";

function MemoBottomSheet() {
  const registerLessonValues = useRegisterLessonValuesStore(
    (state) => state.registerLessonValues
  );
  const setRegisterLessonValues = useRegisterLessonValuesStore(
    (state) => state.setRegisterLessonValues
  );
  return (
    <BottomSheet>
      <div className={styles.container}>
        <textarea
          placeholder="메모를 입력해주세요."
          autoFocus
          value={registerLessonValues.reservationMemo}
          onChange={(e) => {
            setRegisterLessonValues({ reservationMemo: e.target.value });
          }}
        />
      </div>
    </BottomSheet>
  );
}

export default MemoBottomSheet;
