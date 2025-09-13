import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./ExtraTicketConfirmBottomSheet.module.scss";
import { closeBottomSheet } from "@/utils/bottomSheet";
import { UseFormReturn } from "react-hook-form";
import Button from "@/components/button/Button";
import Row from "@/components/flex/Row";
import { openModal } from "@/utils/modal";
import SuccessModal from "@/components/modal/system-modal/success-modal/SuccessModal";
import { useNavigate } from "react-router-dom";
import { ExtraRegisterTicketForm } from "../ExtraRegisterTicketFormView";
import { usePostUserTicketPlus } from "@/api/generated/이용권/이용권";
import dayjs from "dayjs";

interface ExtraTicketConfirmBottomSheetProps {
  form: UseFormReturn<ExtraRegisterTicketForm, any, undefined>;
}

export default function ExtraTicketConfirmBottomSheet({
  form,
}: ExtraTicketConfirmBottomSheetProps) {
  const navigate = useNavigate();
  const selectedCenterId = useUserStore(
    (state) => state.selectedCenter
  ).centerId;
  const [searchParams] = useSearchParams();
  const memberId = searchParams.get("member-id");

  const { mutate: registerExtraTicket } = usePostUserTicketPlus({
    mutation: {
      onSuccess: () => {
        openModal({
          component: SuccessModal,
          props: {
            successMessage: "이용권 추가 등록이\n 완료 되었습니다",
            onCloseComplete: () => {
              navigate(-1);
            },
          },
        });
      },
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    if (!selectedCenterId || !memberId) {
      return;
    }

    registerExtraTicket({
      data: {
        centerId: selectedCenterId,
        memberId: memberId,
        productCount: data.productCount.toString(),
        productStartDate: dayjs(data.productStartDate).format("YYYYMMDD"),
        productEndDate: dayjs(data.productEndDate).format("YYYYMMDD"),
        productName: data.productName,
        productPrice: data.productPrice.toString(),
      },
    });
  });

  return (
    <BottomSheet>
      <div className={styles.container}>
        <div className={styles.title}>
          입력하신 <span>이용권 추가 등록 정보</span>를 확인해주세요
        </div>

        <div className={styles.content}>
          <Row className={styles.content_item} justifyContent="space-between">
            <div>상품명</div>
            <div>{form.getValues().productName}</div>
          </Row>
          <Row className={styles.content_item} justifyContent="space-between">
            <div>시작일</div>
            <div>{form.getValues().productStartDate}</div>
          </Row>
          <Row className={styles.content_item} justifyContent="space-between">
            <div>종료일</div>
            <div>{form.getValues().productEndDate}</div>
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
