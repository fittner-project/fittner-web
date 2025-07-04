import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./ProductConfirmBottomSheet.module.scss";
import { closeBottomSheet } from "@/utils/bottomSheet";
import { UseFormReturn } from "react-hook-form";
import { RegisterTraineeForm } from "../../RegisterTrainee";
import { usePostUserRegister } from "@/api/generated/유저/유저";
import Button from "@/components/button/Button";
import Row from "@/components/flex/Row";
import { openModal } from "@/utils/modal";
import SuccessModal from "@/components/modal/system-modal/success-modal/SuccessModal";
import PATH from "@/router/path";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

interface ProductConfirmBottomSheetProps {
  form: UseFormReturn<RegisterTraineeForm, any, undefined>;
}

export default function ProductConfirmBottomSheet({
  form,
}: ProductConfirmBottomSheetProps) {
  const navigate = useNavigate();
  const { mutate: registerTrainee } = usePostUserRegister({
    mutation: {
      onSuccess: (data) => {
        closeBottomSheet();
      },
      onError: () => {},
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    const formattedData = {
      ...data,
      memberPhone: data.memberPhone.replace(/-/g, ""),
      productCount: Number(data.productCount),
      productPrice: Number(data.productPrice),
    };

    registerTrainee({ data: formattedData });

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
  });

  return (
    <BottomSheet>
      <div className={styles.container}>
        <div className={styles.title}>
          입력하신 <span>상품정보</span>를<br /> 확인해주세요.
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
