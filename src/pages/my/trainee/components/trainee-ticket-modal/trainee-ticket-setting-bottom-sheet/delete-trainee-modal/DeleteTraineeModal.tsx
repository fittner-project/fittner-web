import {
  getGetUserMembersQueryKey,
  useDeleteUser,
} from "@/api/generated/유저/유저";
import { closeModal, openModal } from "@/utils/modal";
import SuccessModal from "@/components/modal/system-modal/success-modal/SuccessModal";
import { useQueryClient } from "@tanstack/react-query";
import ConfirmTraineeNameModal from "@/components/modal/system-modal/confirm-trainee-name-modal/ConfirmTraineeNameModal";

interface DeleteTraineeModalProps {
  memberId: string;
  memberName: string;
}

export default function DeleteTraineeModal({
  memberId,
  memberName,
}: DeleteTraineeModalProps) {
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

  return (
    <ConfirmTraineeNameModal
      callback={() => deleteUser({ memberId })}
      memberName={memberName}
    >
      확인을 위해 회원님의 <br />
      이름을 작성해주세요
    </ConfirmTraineeNameModal>
  );
}
