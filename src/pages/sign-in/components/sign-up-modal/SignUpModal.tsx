import Modal from "@/components/modal/Modal";
import styles from "./SignUpModal.module.scss";
import Image from "@/components/image/Image";
import { alertTriangle } from "@/assets/assets";
import Button from "@/components/button/Button";
import PATH from "@/router/path";

function AuthModal() {
  return (
    <Modal>
      <div className={styles.container}>
        <Image
          width={4.6611}
          height={4.4788}
          src={alertTriangle}
          alt="alert-triangle"
        />
        <div className={styles.title}>신규회원이시네요</div>
        <div className={styles.description}>기본 정보를 추가해주세요</div>
        <Button
          backgroundColor="primary_1"
          fullWidth
          className={styles.sign_up_button}
          href={PATH.SIGN_UP.TERMS}
        >
          회원가입
        </Button>
      </div>
    </Modal>
  );
}

export default AuthModal;
