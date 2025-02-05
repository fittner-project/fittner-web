import { useBottomSheetStore } from "@/store/bottomSheet";
import styles from "./BottomSheetManager.module.scss";
import { closeBottomSheet } from "@/utils/bottomSheet";
import { useState, useEffect } from "react";
import classNames from "classnames";
import useSafeTimeout from "@/hooks/useSafeTimeout";

export default function BottomSheetManager() {
  const currentSheet = useBottomSheetStore((state) => state.currentSheet);
  const isLoading = useBottomSheetStore((state) => state.isLoading);
  const [displaySheet, setDisplaySheet] = useState(currentSheet);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (currentSheet && !displaySheet) {
      setDisplaySheet(currentSheet);
      setIsClosing(false);
    } else if (!currentSheet && displaySheet && !isClosing) {
      setIsClosing(true);
    }
  }, [currentSheet, displaySheet, isClosing]);

  useSafeTimeout(
    () => {
      if (isClosing) {
        setDisplaySheet(null);
        setIsClosing(false);
      }
    },
    300,
    [isClosing]
  );

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (displaySheet && e.target === e.currentTarget) {
      e.preventDefault();
      e.stopPropagation();
      closeBottomSheet();
    }
  };

  if (!displaySheet && !isLoading) return null;

  return (
    <div
      className={classNames(styles.overlay, {
        [styles.closing]: isClosing,
      })}
      onClick={handleOverlayClick}
    >
      {isLoading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        displaySheet && <displaySheet.component {...displaySheet.props} />
      )}
    </div>
  );
}
