import { ComponentType } from "react";
import styles from "./ModalManager.module.scss";

function ModalManager() {
  const { modals, isLoading } = useModalStore();

  if (modals.length === 0 && !isLoading) return null;

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

export default ModalManager;
