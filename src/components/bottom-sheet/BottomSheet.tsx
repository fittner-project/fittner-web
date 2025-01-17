import { Sheet } from "react-modal-sheet";
import { useBottomSheetStore } from "@/store/bottomSheet";
import styles from "./BottomSheet.module.scss";

interface BottomSheetProps {
  children: React.ReactNode;
  onClose?: () => void;
}

function BottomSheet({ children, onClose }: BottomSheetProps) {
  const { closeBottomSheet, setIsOpen } = useBottomSheetStore();
  const isOpen = useBottomSheetStore((state) => state.isOpen);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAnimationEnd = () => {
    if (!isOpen) {
      closeBottomSheet();
    }
  };

  return (
    <Sheet
      detent="content-height"
      dragVelocityThreshold={300}
      isOpen={isOpen}
      onClose={handleClose}
      onCloseEnd={handleAnimationEnd}
    >
      <Sheet.Container className={styles.container}>
        <Sheet.Header className={styles.header}></Sheet.Header>
        <Sheet.Content className={styles.content}>{children}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop className={styles.backdrop} />
    </Sheet>
  );
}

export default BottomSheet;
