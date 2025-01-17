import { useBottomSheetStore } from "@/store/bottomSheet";
import styles from "./BottomSheetManager.module.scss";
import { closeBottomSheet } from "@/utils/bottomSheet";

export default function BottomSheetManager() {
  const { currentSheet, isLoading } = useBottomSheetStore();

  if (!currentSheet && !isLoading) return;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (currentSheet && e.target === e.currentTarget) {
      e.preventDefault();
      e.stopPropagation();
      closeBottomSheet();
    }
  };

  return (
    <div
      className={currentSheet ? styles.overlay : undefined}
      onClick={handleOverlayClick}
    >
      {isLoading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        currentSheet && <currentSheet.component {...currentSheet.props} />
      )}
    </div>
  );
}
