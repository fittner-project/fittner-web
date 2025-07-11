import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./AssignNewTraineeProductConfirmBottomSheet.module.scss";
import { closeBottomSheet } from "@/utils/bottomSheet";
import { UseFormReturn } from "react-hook-form";
import Button from "@/components/button/Button";
import Row from "@/components/flex/Row";
import { openModal } from "@/utils/modal";
import SuccessModal from "@/components/modal/system-modal/success-modal/SuccessModal";
import PATH from "@/router/path";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { RegisterTraineeForm } from "../../AssignNewTrainee";
import { usePostUserTicketAssignNewMember } from "@/api/generated/이용권/이용권";
import useAssignNewTraineeValueStore from "../../stores/assignNewTraineeValue";
import { storageKeys } from "@/constants/storageKeys";

interface ProductConfirmBottomSheetProps {
  form: UseFormReturn<RegisterTraineeForm, any, undefined>;
}

export default function AssignNewTraineeProductConfirmBottomSheet({
  form,
}: ProductConfirmBottomSheetProps) {
  const navigate = useNavigate();
  const reset = useAssignNewTraineeValueStore((state) => state.reset);
  const { mutate: assignNewTrainee } = usePostUserTicketAssignNewMember({
    mutation: {
      onSuccess: () => {
        form.reset();
        reset();
        sessionStorage.removeItem(storageKeys.assignNewTraineeFormValues);

        openModal({
          component: SuccessModal,
          props: {
            successMessage: "회원등록이\n 완료 되었습니다",
            onCloseComplete: () => {
              navigate({
                pathname: PATH.MY.TRAINEE_OR_TRAINER,
                search: "?type=trainee",
              });
            },
          },
        });
      },
    },
  });
  const originalTicketId = useAssignNewTraineeValueStore(
    (state) => state.originalTicketId
  );

  const handleSubmit = form.handleSubmit((data) => {
    const formattedData = {
      originalTicketId: originalTicketId,
      centerId: data.centerId,
      trainerId: data.trainerId,
      memberName: data.memberName,
      memberPhone: data.memberPhone.replace(/-/g, ""),
      memberGender: data.memberGender,
      memberBirth: data.memberBirth,
      memberAddress: data.memberAddress,
      productName: data.productName,
      productStartDate: data.productStartDate,
      productEndDate: data.productEndDate,
      productCount: data.productCount,
      productPrice: data.productPrice,
      memberMemo: data.memberMemo,
      memberJoinPath: data.memberJoinPath,
    };

    assignNewTrainee({ data: formattedData });
  });

  return (
    <BottomSheet>
      <div className={styles.container}>
        <div className={styles.title}>
          입력하신 <span>양도 상품정보</span>를<br /> 확인해주세요.
        </div>

        <div className={styles.content}>
          <Row className={styles.content_item} justifyContent="space-between">
            <div>상품명</div>
            <div>{form.getValues().productName}</div>
          </Row>
          <Row className={styles.content_item} justifyContent="space-between">
            <div>시작일</div>
            <div>
              {dayjs(form.getValues().productStartDate).format("YYYY-MM-DD")}
            </div>
          </Row>
          <Row className={styles.content_item} justifyContent="space-between">
            <div>종료일</div>
            <div>
              {dayjs(form.getValues().productEndDate).format("YYYY-MM-DD")}
            </div>
          </Row>
          <Row className={styles.content_item} justifyContent="space-between">
            <div>수업횟수</div>
            <div>{form.getValues().productCount}</div>
          </Row>
          <Row className={styles.content_item} justifyContent="space-between">
            <div>금액</div>
            <div>{Number(form.getValues().productPrice).toLocaleString()}</div>
          </Row>

          <Row className={styles.content_item} justifyContent="space-between">
            <div>메모</div>
            <div>{form.getValues().memberMemo}</div>
          </Row>

          <Row className={styles.content_item} justifyContent="space-between">
            <div>가입경로</div>
            <div>{form.getValues().memberJoinPath}</div>
          </Row>
        </div>

        <Row className={styles.button_container} justifyContent="space-between">
          <Button
            backgroundColor="grey_1"
            fullWidth
            className={styles.next_button}
            onClick={() => closeBottomSheet()}
          >
            수정
          </Button>

          <Button
            backgroundColor="primary_1"
            fullWidth
            className={styles.next_button}
            onClick={handleSubmit}
          >
            등록
          </Button>
        </Row>
      </div>
    </BottomSheet>
  );
}
