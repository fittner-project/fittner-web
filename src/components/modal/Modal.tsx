import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Modal.module.scss";
import { SlideUp } from "../animation/SlideUp";

export interface ModalProps {
  children: React.ReactNode;
  width?: number;
}

export default function Modal({ children, width = 32 }: ModalProps) {
  const { modals, closeModal } = useModalStore();
  const isFirstRender = useRef(true);
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (prevPathRef.current !== location.pathname) {
      closeModal();
    }

    prevPathRef.current = location.pathname;
  }, [location.pathname]);

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
