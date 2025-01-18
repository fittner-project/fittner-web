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
        duration: 0.5,
      }}
      style={{
        maxWidth: "100%",
        height: "100%",
        WebkitTransform: "translate3d(0,0,0)",
        transform: "translate3d(0,0,0)",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        WebkitPerspective: 1000,
        perspective: 1000,
      }}
    >
      <Sheet.Container className={styles.container}>
        <Sheet.Header className={styles.header} />
        <Sheet.Content className={styles.content}>{children}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop className={styles.backdrop} />
    </Sheet>
  );
}
