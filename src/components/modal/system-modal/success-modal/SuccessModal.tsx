import Image from "@/components/image/Image";
import Modal from "../../Modal";
import styles from "./SuccessModal.module.scss";
import { checkSel } from "@/assets/assets";
import { closeModal } from "@/utils/modal";
import { useRef, useEffect } from "react";
import useSafeTimeout from "@/hooks/useSafeTimeout";

interface SuccessModalProps {
  successMessage: string;
  onCloseComplete?: () => void;
}

function SuccessModal({ successMessage, onCloseComplete }: SuccessModalProps) {
  const isFirstRender = useRef(true);
  const isCompleted = useRef(false);

  const handleCloseComplete = () => {
    if (!isCompleted.current) {
      onCloseComplete?.();
      isCompleted.current = true;
    }
  };

  useSafeTimeout(
    () => {
      closeModal({ onCloseComplete: handleCloseComplete });
    },
    2500,
    [onCloseComplete]
  );

  useEffect(() => {
    return () => {
      if (!isFirstRender.current) {
        handleCloseComplete();
      }
      isFirstRender.current = false;
    };
  }, []);

  return (
    <Modal onCloseComplete={handleCloseComplete}>
      <div className={styles.container}>
        <Image width={3.8} height={3.8} src={checkSel} alt="check-sel" />
        <p className={styles.success_message}>{successMessage}</p>
      </div>
    </Modal>
  );
}

export default SuccessModal;
