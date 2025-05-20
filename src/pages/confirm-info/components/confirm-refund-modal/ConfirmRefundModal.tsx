import { usePostUserTicketRefundAllow } from "@/api/generated/이용권/이용권";
import ConfirmTraineeNameModal from "@/components/modal/system-modal/confirm-trainee-name-modal/ConfirmTraineeNameModal";
import SuccessModal from "@/components/modal/system-modal/success-modal/SuccessModal";
import { closeModal, openModal } from "@/utils/modal";

interface ConfirmRefundModalProps {
  memberName: string;
  ticketId: string;
}

export default function ConfirmRefundModal({
  memberName,
  ticketId,
}: ConfirmRefundModalProps) {
  const navigate = useNavigate();
  const { mutate: refund } = usePostUserTicketRefundAllow({
    mutation: {
      onSuccess: () => {
        closeModal();
        openModal({
          component: SuccessModal,
          props: {
            onCloseComplete: () => {
              closeModal();
              navigate(-1);
            },
            successMessage: "환불신청이 \n 완료되었습니다.",
          },
        });
      },
    },
  });

  return (
    <ConfirmTraineeNameModal
      callback={() => {
        refund({ data: { ticketId } });
      }}
      memberName={memberName}
    >
      환불신청을 위해 회원님의 <br /> 이름을 작성해주세요
    </ConfirmTraineeNameModal>
  );
}
