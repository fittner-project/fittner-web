import { UseFormReturn } from "react-hook-form";
import styles from "./TraineeFormView.module.scss";
import Input from "@/components/input/Input";
import Radio from "@/components/radio/Radio";
import Button from "@/components/button/Button";
import formatPhoneNumber from "@/utils/formatPhoneNumber";

import { formatNumberOnly } from "@/utils/formatNumber";

interface ITraineeFormViewProps {
  form: UseFormReturn<any, any, undefined>;
  setStep: React.Dispatch<React.SetStateAction<1 | 2>>;
}
export default function TraineeFormView({
  form,
  setStep,
}: ITraineeFormViewProps) {
  const { watch } = form;

  // 모든 필드의 값을 감시
  const values = watch();

  // 모든 필수 필드가 채워졌는지 확인
  const isFormComplete =
    values.centerName?.trim() &&
    values.trainerName?.trim() &&
    values.memberName?.trim() &&
    values.memberPhone?.trim() &&
    values.memberGender &&
    values.memberBirth?.trim() &&
    values.memberAddress?.trim();

  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <p className={styles.title}>센터</p>
        <Input
          inputType="line-search"
          maxLength={10}
          className={styles.name_input}
          {...form.register("centerName", {
            required: true,
          })}
          placeholder="센터 이름을 입력해주세요"
          readOnly
        />
      </div>
      <div className={styles.field}>
        <p className={styles.title}>트레이너</p>
        <Input
          inputType="line-search"
          maxLength={10}
          className={styles.name_input}
          {...form.register("trainerName", {
            required: true,
          })}
          placeholder="양도 회원의 트레이너를 검색해주세요"
          readOnly
        />
      </div>
      <div className={styles.field}>
        <p className={styles.title}>이름</p>
        <Input
          inputType="line"
          maxLength={10}
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
          type="tel"
          maxLength={13}
          className={styles.name_input}
          {...form.register("memberPhone", {
            required: true,
            pattern: {
              value: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
              message: "올바른 휴대폰 번호를 입력해주세요",
            },
            onChange: (e) => {
              const formatted = formatPhoneNumber({ value: e.target.value });
              form.setValue("memberPhone", formatted);
            },
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

      <div className={styles.field}>
        <p className={styles.title}>생년월일</p>
        <Input
          inputType="line"
          type="text"
          className={styles.name_input}
          {...form.register("memberBirth", {
            required: true,
            onChange: (e) => {
              const formatted = formatNumberOnly({ value: e.target.value });
              form.setValue("memberBirth", formatted);
            },
          })}
          placeholder="YYMMDD (6자리)"
          maxLength={6}
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
          disabled={!isFormComplete}
          onClick={() => setStep(2)}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
