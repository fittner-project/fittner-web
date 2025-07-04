import Button from "@/components/button/Button";
import styles from "./PauseTicketBottomSheet.module.scss";
import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import { closeBottomSheet } from "@/utils/bottomSheet";
import { useForm } from "react-hook-form";
import { openModal } from "@/utils/modal";
import SuccessModal from "@/components/modal/system-modal/success-modal/SuccessModal";
import { usePostUserTicketSuspendAllow } from "@/api/generated/이용권/이용권";

interface PauseTicketBottomSheetProps {
  ticketId: string;
}

export default function PauseTicketBottomSheet({
  ticketId,
}: PauseTicketBottomSheetProps) {
  const { register, watch, handleSubmit } = useForm<{ suspendReason: string }>({
    mode: "onChange",
  });
  const { mutate: pauseTicket } = usePostUserTicketSuspendAllow({
    mutation: {
      onSuccess: () => {
        openModal({
          component: SuccessModal,
          props: {
            successMessage: "기간 정지가 \n 완료되었습니다",
            onCloseComplete: () => {
              closeBottomSheet();
            },
          },
        });
      },
    },
  });
  const suspendReason = watch("suspendReason");

  const handlePauseTicket = () => {
    if (suspendReason) {
      pauseTicket({
        data: { ticketId: ticketId, suspendReason: suspendReason },
      });
    }
  };

  return (
    <BottomSheet>
      <div className={styles.container}>
        <p className={styles.title}>
          이용권 기간을 <br />
          <span>정지</span>하고 싶으신가요?
        </p>

        <textarea
          placeholder="정지 사유를 입력해주세요."
          {...register("suspendReason")}
        />

        <div className={styles.buttonContainer}>
          <Button
            onClick={() => closeBottomSheet()}
            fullWidth
            backgroundColor="grey_1"
          >
            취소
          </Button>
          <Button
            fullWidth
            backgroundColor="primary_1"
            onClick={handleSubmit(handlePauseTicket)}
          >
            정지하기
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}
