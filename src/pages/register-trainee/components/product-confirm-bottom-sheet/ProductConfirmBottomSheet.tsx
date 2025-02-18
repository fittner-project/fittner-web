import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./ProductConfirmBottomSheet.module.scss";
import { closeBottomSheet } from "@/utils/bottomSheet";
import { UseFormReturn } from "react-hook-form";
import { RegisterTraineeForm } from "../../RegisterTrainee";

interface ProductConfirmBottomSheetProps {
  form: UseFormReturn<RegisterTraineeForm, any, undefined>;
  handleSubmit: () => void;
}

export default function ProductConfirmBottomSheet({
  form,
  handleSubmit,
}: ProductConfirmBottomSheetProps) {
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
