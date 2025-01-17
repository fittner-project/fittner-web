import { useBottomSheetStore } from "@/store/bottomSheet";
import styles from "./BottomSheetManager.module.scss";

function BottomSheetManager() {
  const { currentSheet, isLoading, setIsOpen } = useBottomSheetStore();

  if (!currentSheet && !isLoading) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      {isLoading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        currentSheet && <currentSheet.component {...currentSheet.props} />
      )}
    </div>
  );
}

export default BottomSheetManager;
