import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./ColorTagBottomSheet.module.scss";
import { useUserStore } from "@/stores/user";
import { uniqueId } from "lodash";
import { useState } from "react";
import classNames from "classnames";

function ColorTagBottomSheet() {
  const reservationColors = useUserStore((state) => state.reservationColors);
  const [selectedColor, setSelectedColor] = useState("");

  return (
    <BottomSheet>
      <div className={styles.container}>
        <p className={styles.title}>색상 태그</p>
        <div className={styles.color_tag_container}>
          {reservationColors.colors?.map((color) => (
            <div
              key={uniqueId()}
              onClick={() => setSelectedColor(color.colorHex ?? "")}
              className={classNames(styles.color_tag, {
                [styles.selected]: selectedColor === color.colorHex,
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
