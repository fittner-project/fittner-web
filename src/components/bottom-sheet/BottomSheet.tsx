import { Sheet } from "react-modal-sheet";
import { useBottomSheetStore } from "@/store/bottomSheet";
import styles from "./BottomSheet.module.scss";
import { closeBottomSheet } from "@/utils/bottomSheet";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

interface BottomSheetProps {
  children: React.ReactNode;
  disableDrag?: boolean;
}

export default function BottomSheet({
  children,
  disableDrag = false,
}: BottomSheetProps) {
  const isOpen = useBottomSheetStore((state) => state.isOpen);
  const isFirstRender = useRef(true);
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (prevPathRef.current !== location.pathname) {
      closeBottomSheet();
    }

    prevPathRef.current = location.pathname;
  }, [location.pathname]);

  return (
    <Sheet
      detent="content-height"
      dragVelocityThreshold={300}
      disableDrag={disableDrag}
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
