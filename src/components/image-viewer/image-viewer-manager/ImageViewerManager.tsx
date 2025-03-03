import { MotionDiv } from "@/components/animation/Motion";
import ImageViewer from "../ImageViewer";
import { AnimatePresence } from "framer-motion";

export default function ModalManager() {
  const isOpen = useImageViewerStore((state) => state.isOpen);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <MotionDiv
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.3, opacity: 0 }}
          transition={{
            type: "tween",
            duration: 0.2,
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 15000,
          }}
        >
          <ImageViewer />
        </MotionDiv>
      )}
    </AnimatePresence>
  );
}
