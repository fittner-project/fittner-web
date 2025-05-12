import Modal from "@/components/modal/Modal";
import styles from "./DeleteTraineeModal.module.scss";
import Input from "@/components/input/Input";

interface DeleteTraineeModalProps {
  memberId: string;
  memberName: string;
}

export default function DeleteTraineeModal({
  memberId,
  memberName,
}: DeleteTraineeModalProps) {
  return (
    <Modal>
      <div className={styles.container}>
        <p className={styles.title}>
          확인을 위해 회원님의 <br />
          이름을 작성해주세요
        </p>
        <Input autoFocus inputType="line" placeholder={memberName} />
      </div>
    </Modal>
  );
}
