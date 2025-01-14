import { alertTriangle } from "@/assets/assets";
import Modal from "../../Modal";
import Image from "@/components/image/Image";
import styles from "./AlertModal.module.scss";

interface AlertModalProps {
  errorMessage: string;
}

function AlertModal({ errorMessage }: AlertModalProps) {
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
