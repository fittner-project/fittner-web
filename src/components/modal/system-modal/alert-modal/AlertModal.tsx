import { useRef, useEffect } from "react";
import { alertModalIcon } from "@/assets/assets";
import Modal from "../../Modal";
import Image from "@/components/image/Image";
import styles from "./AlertModal.module.scss";
import { closeModal } from "@/utils/modal";
import useSafeTimeout from "@/hooks/useSafeTimeout";

interface AlertModalProps {
  errorMessage: string;
  onCloseComplete?: () => void;
}

function AlertModal({ errorMessage, onCloseComplete }: AlertModalProps) {
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
        <Image
          width={3.8}
          height={3.8}
          src={alertModalIcon}
          alt="alert-triangle"
        />
        <p className={styles.error_message}>{errorMessage}</p>
      </div>
    </Modal>
  );
}

export default AlertModal;
