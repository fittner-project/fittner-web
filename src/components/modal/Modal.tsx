import styles from "./Modal.module.scss";

export interface ModalProps {
  children: React.ReactNode;
  width?: number;
  onClose?: () => void;
}

function Modal({ children, width = 32, onClose }: ModalProps) {
  const { modals, closeModal } = useModalStore();

  if (modals.length === 0) return null;

  const handleClose = () => {
    onClose?.();
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

export default Modal;
