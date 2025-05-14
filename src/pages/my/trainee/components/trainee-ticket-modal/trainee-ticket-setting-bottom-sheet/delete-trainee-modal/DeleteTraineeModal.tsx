import Modal from "@/components/modal/Modal";
import styles from "./DeleteTraineeModal.module.scss";
import Input from "@/components/input/Input";
import { useForm } from "react-hook-form";
import {
  getGetUserMembersQueryKey,
  useDeleteUser,
} from "@/api/generated/유저/유저";
import { closeModal, openModal } from "@/utils/modal";
import SuccessModal from "@/components/modal/system-modal/success-modal/SuccessModal";
import { useQueryClient } from "@tanstack/react-query";

interface DeleteTraineeModalProps {
  memberId: string;
  memberName: string;
}

export default function DeleteTraineeModal({
  memberId,
  memberName,
}: DeleteTraineeModalProps) {
  const { register, watch } = useForm();
  const memberNameValue = watch("memberName");
  const queryClient = useQueryClient();

  const { mutate: deleteUser } = useDeleteUser({
    mutation: {
      onSuccess: () => {
        closeModal();
        queryClient.invalidateQueries({
          queryKey: getGetUserMembersQueryKey(),
        });
        openModal({
          component: SuccessModal,
          props: {
            onCloseComplete: () => closeModal(),
            successMessage: "회원 삭제가 \n 완료되었습니다.",
          },
        });
      },
    },
  });

  useEffect(() => {
    if (memberName === memberNameValue) {
      deleteUser({ memberId });
    }
  }, [memberNameValue]);

  return (
    <Modal>
      <div className={styles.container}>
        <p className={styles.title}>
          확인을 위해 회원님의 <br />
          이름을 작성해주세요
        </p>
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
