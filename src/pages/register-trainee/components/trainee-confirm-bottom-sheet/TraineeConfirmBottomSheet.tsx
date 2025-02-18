import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./TraineeConfirmBottomSheet.module.scss";
import { closeBottomSheet } from "@/utils/bottomSheet";
import { UseFormReturn } from "react-hook-form";
import { RegisterTraineeForm } from "../../RegisterTrainee";

interface TraineeConfirmBottomSheetProps {
  form: UseFormReturn<RegisterTraineeForm, any, undefined>;
  onClickBtnTwo: () => void;
}

export default function TraineeConfirmBottomSheet({
  form,
  onClickBtnTwo,
}: TraineeConfirmBottomSheetProps) {
  console.log(form.getValues());

  return (
    <BottomSheet>
      <div className={styles.container}>
        <div className={styles.title}>
          입력하신 <span>회원 정보</span>를<br /> 확인해주세요.
        </div>

        <div className={styles.content}></div>
      </div>
    </BottomSheet>
  );
}
