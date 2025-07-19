import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./ColorTagBottomSheet.module.scss";
import { useUserStore } from "@/stores/user";
import { uniqueId } from "lodash";
import classNames from "classnames";
import useRegisterLessonValuesStore from "../../stores/registerLessonValues";

function ColorTagBottomSheet() {
  const reservationColors = useUserStore((state) => state.reservationColors);
  const setRegisterLessonValues = useRegisterLessonValuesStore(
    (state) => state.setRegisterLessonValues
  );
  const registerLessonValues = useRegisterLessonValuesStore(
    (state) => state.registerLessonValues
  );

  return (
    <BottomSheet>
      <div className={styles.container}>
        <p className={styles.title}>색상 태그</p>
        <div className={styles.color_tag_container}>
          {reservationColors.colors?.map((color) => (
            <div
              key={uniqueId()}
              onClick={() => {
                setRegisterLessonValues({
                  reservationColor: color,
                });
              }}
              className={classNames(styles.color_tag, {
                [styles.selected]:
                  registerLessonValues.reservationColor?.colorHex ===
                  color.colorHex,
              })}
            >
              <div
                className={styles.color_tag_color}
                style={{ backgroundColor: `#${color.colorHex}` }}
              />
              <p className={styles.color_tag_text}>{color.colorName}</p>
            </div>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
}

export default ColorTagBottomSheet;
