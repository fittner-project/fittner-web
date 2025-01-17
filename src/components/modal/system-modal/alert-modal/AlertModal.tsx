import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { alertTriangle } from "@/assets/assets";
import Modal from "../../Modal";
import Image from "@/components/image/Image";
import styles from "./AlertModal.module.scss";
import { closeModal } from "@/utils/modal";

interface AlertModalProps {
  errorMessage: string;
  onCloseComplete?: () => void;
}

function AlertModal({ errorMessage, onCloseComplete }: AlertModalProps) {
  const isFirstRender = useRef(true);
  const isCompleted = useRef(false);
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  const handleCloseComplete = () => {
    if (!isCompleted.current) {
      onCloseComplete?.();
      isCompleted.current = true;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      closeModal({ onCloseComplete: handleCloseComplete });
    }, 2500);

    return () => {
      if (!isFirstRender.current) {
        clearTimeout(timer);
        handleCloseComplete();
      }
      isFirstRender.current = false;
    };
  }, [onCloseComplete]);

  useEffect(() => {
    if (!isFirstRender.current && prevPathRef.current !== location.pathname) {
      closeModal();
    }
    prevPathRef.current = location.pathname;
  }, [location]);

  return (
    <Modal>
      <div className={styles.container}>
        <Image
          width={4.6611}
          height={4.4788}
          src={alertTriangle}
          alt="alert-triangle"
        />
        <p className={styles.error_message}>{errorMessage}</p>
      </div>
    </Modal>
  );
}

export default AlertModal;
