import Modal from "@/components/modal/Modal";
import styles from "./ConfirmTraineeNameModal.module.scss";
import Input from "@/components/input/Input";
import { useForm } from "react-hook-form";
import { PropsWithChildren } from "react";

interface ConfirmTraineeNameModalProps {
  callback: () => void;
  memberName: string;
}

export default function ConfirmTraineeNameModal({
  callback,
  memberName,
  children,
}: PropsWithChildren<ConfirmTraineeNameModalProps>) {
  const { register, watch } = useForm();
  const memberNameValue = watch("memberName");

  useEffect(() => {
    if (memberName === memberNameValue) {
      callback();
    }
  }, [memberNameValue]);

  return (
    <Modal>
      <div className={styles.container}>
        <p className={styles.title}>{children}</p>
        <Input
          autoFocus
          inputType="line"
          placeholder={memberName}
          {...register("memberName")}
        />
      </div>
    </Modal>
  );
}
