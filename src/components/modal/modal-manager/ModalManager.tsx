import { ComponentType } from "react";
import styles from "./ModalManager.module.scss";

export default function ModalManager() {
  const modals = useModalStore((state) => state.modals);
  const isLoading = useModalStore((state) => state.isLoading);

  if (modals.length === 0 && !isLoading) return;

  return (
    <div className={styles.overlay}>
      {isLoading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        modals.map((modal, index) => {
          const ModalComponent = modal.component as ComponentType<any>;
          return (
            <div key={index} className={styles.modalWrapper}>
              <ModalComponent {...modal.props}>
                {modal.props.children}
              </ModalComponent>
            </div>
          );
        })
      )}
    </div>
  );
}
