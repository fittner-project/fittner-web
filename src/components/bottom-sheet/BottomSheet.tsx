import { Sheet } from "react-modal-sheet";
import { useBottomSheetStore } from "@/store/bottomSheet";
import styles from "./BottomSheet.module.scss";
import { closeBottomSheet } from "@/utils/bottomSheet";

interface BottomSheetProps {
  children: React.ReactNode;
}

export default function BottomSheet({ children }: BottomSheetProps) {
  const { isOpen } = useBottomSheetStore();

  return (
    <Sheet
      detent="content-height"
      dragVelocityThreshold={300}
      isOpen={isOpen}
      onClose={closeBottomSheet}
      tweenConfig={{
        ease: "easeInOut",
        duration: 0.3,
      }}
    >
      <Sheet.Container className={styles.container}>
        <Sheet.Header className={styles.header}></Sheet.Header>
        <Sheet.Content className={styles.content}>{children}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop className={styles.backdrop} />
    </Sheet>
  );
}
