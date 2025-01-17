import Image from "@/components/image/Image";
import Modal from "../../Modal";
import styles from "./SuccessModal.module.scss";
import { checkSel } from "@/assets/assets";
import { closeModal } from "@/utils/modal";

interface SuccessModalProps {
  successMessage: string;
  onCloseComplete?: () => void;
}

function SuccessModal({ successMessage, onCloseComplete }: SuccessModalProps) {
  useEffect(() => {
    setTimeout(() => {
      closeModal({ onCloseComplete });
    }, 2500);
  }, []);

  return (
    <Modal>
      <div className={styles.container}>
        <Image width={3.8} height={3.8} src={checkSel} alt="check-sel" />
        <p className={styles.success_message}>{successMessage}</p>
      </div>
    </Modal>
  );
}

export default SuccessModal;
