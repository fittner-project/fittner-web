import { UseFormReturn } from "react-hook-form";
import styles from "./ProductFormView.module.scss";
import { RegisterTraineeForm } from "../../RegisterTrainee";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";

interface IProductFormViewProps {
  form: UseFormReturn<RegisterTraineeForm, any, undefined>;
}

export default function ProductFormView({ form }: IProductFormViewProps) {
  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <p className={styles.title}>이름</p>
        <Input
          inputType="line"
          maxLength={5}
          className={styles.name_input}
          {...form.register("memberName", {
            required: true,
          })}
          placeholder="회원의 이름을 입력해주세요"
        />
      </div>

      <div className={styles.field}>
        <p className={styles.title}>연락처</p>
        <Input
          inputType="line"
          maxLength={11}
          className={styles.name_input}
          {...form.register("memberPhone", {
            required: true,
          })}
          placeholder="회원의 연락처를 입력해주세요"
        />
      </div>

      <div className={styles.field}>
        <p className={styles.title}>생년월일</p>
        <Input
          inputType="line"
          maxLength={6}
          className={styles.name_input}
          {...form.register("memberBirth", {
            required: true,
          })}
          placeholder="YYMMDD (6자리)"
        />
      </div>

      <div className={styles.field}>
        <p className={styles.title}>주소</p>
        <Input
          inputType="line"
          maxLength={50}
          className={styles.name_input}
          {...form.register("memberAddress", {
            required: true,
          })}
          placeholder="회원의 주소를 입력해주세요"
        />
      </div>

      <div className={styles.button_container}>
        <Button
          type="submit"
          backgroundColor="primary_1"
          fullWidth
          className={styles.next_button}
          disabled={false}
        >
          등록
        </Button>
      </div>
    </div>
  );
}
