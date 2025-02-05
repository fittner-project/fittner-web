import { UseFormReturn } from "react-hook-form";
import styles from "./TraineeFormView.module.scss";
import { RegisterTraineeForm } from "../../RegisterTrainee";
import Input from "@/components/input/Input";
import Radio from "@/components/radio/Radio";

interface ITraineeFormViewProps {
  form: UseFormReturn<RegisterTraineeForm, any, undefined>;
}
export default function TraineeFormView({ form }: ITraineeFormViewProps) {
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
        <p className={styles.title}>성별</p>
        <div className={styles.gender}>
          <Radio
            radioType="default"
            label="남성"
            value="M"
            {...form.register("memberGender", { required: true })}
          />
          <Radio
            radioType="default"
            label="여성"
            value="F"
            {...form.register("memberGender", { required: true })}
          />
        </div>
      </div>
    </div>
  );
}
