import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Modal.module.scss";

export interface ModalProps {
  children: React.ReactNode;
  width?: number;
}

export default function Modal({ children, width = 32 }: ModalProps) {
  const { modals, closeModal } = useModalStore();
  const isFirstRender = useRef(true);
  const location = useLocation();
  const prevUrlRef = useRef(location.pathname + location.search);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (prevUrlRef.current !== location.pathname + location.search) {
      closeModal();
    }

    prevUrlRef.current = location.pathname + location.search;
  }, [location.pathname, location.search]);

  if (modals.length === 0) return;

  const handleClose = () => {
    closeModal();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.modal} onClick={handleClose}>
      <div
        className={styles.content}
        style={{ width: `${width}rem` }}
        onClick={handleModalClick}
      >
        {children}
      </div>
    </div>
  );
}
