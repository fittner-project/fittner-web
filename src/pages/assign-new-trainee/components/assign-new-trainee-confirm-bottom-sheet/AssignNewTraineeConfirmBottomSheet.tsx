import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./AssignNewTraineeConfirmBottomSheet.module.scss";
import { closeBottomSheet, openBottomSheet } from "@/utils/bottomSheet";
import { UseFormReturn } from "react-hook-form";
import Row from "@/components/flex/Row";
import Button from "@/components/button/Button";
import { WaitForSeconds } from "@/utils/coroutine";
import { RegisterTraineeForm } from "../../AssignNewTrainee";
import AssignNewTraineeProductConfirmBottomSheet from "../assign-new-trainee-product-confirm-bottom-sheet/AssignNewTraineeProductConfirmBottomSheet";

interface TraineeConfirmBottomSheetProps {
  form: UseFormReturn<RegisterTraineeForm, any, undefined>;
}

export default function TraineeConfirmBottomSheet({
  form,
}: TraineeConfirmBottomSheetProps) {
  const navigate = useNavigate();

  return (
    <BottomSheet>
      <div className={styles.container}>
        <div className={styles.title}>
          입력하신 <span>양도 회원정보</span>를<br /> 확인해주세요.
        </div>

        <div className={styles.content}>
          <Row className={styles.content_item} justifyContent="space-between">
            <div>이름</div>
            <div>{form.getValues().memberName}</div>
          </Row>
          <Row className={styles.content_item} justifyContent="space-between">
            <div>연락처</div>
            <div>{form.getValues().memberPhone}</div>
          </Row>
          <Row className={styles.content_item} justifyContent="space-between">
            <div>성별</div>
            <div>{form.getValues().memberGender}</div>
          </Row>
          <Row className={styles.content_item} justifyContent="space-between">
            <div>생년월일</div>
            <div>{form.getValues().memberBirth}</div>
          </Row>
          <Row className={styles.content_item} justifyContent="space-between">
            <div>주소</div>
            <div>{form.getValues().memberAddress}</div>
          </Row>
        </div>

        <Row className={styles.button_container} justifyContent="space-between">
          <Button
            backgroundColor="grey_1"
            fullWidth
            className={styles.next_button}
            onClick={() => {
              navigate(-1);
              closeBottomSheet();
            }}
          >
            수정
          </Button>

          <Button
            backgroundColor="primary_1"
            fullWidth
            className={styles.next_button}
            onClick={() => {
              closeBottomSheet();
              WaitForSeconds(300).then(() => {
                openBottomSheet({
                  component: AssignNewTraineeProductConfirmBottomSheet,
                  props: { form },
                });
              });
            }}
          >
            다음
          </Button>
        </Row>
      </div>
    </BottomSheet>
  );
}
