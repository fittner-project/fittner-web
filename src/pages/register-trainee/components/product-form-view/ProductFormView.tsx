import { UseFormReturn } from "react-hook-form";
import styles from "./ProductFormView.module.scss";
import { RegisterTraineeForm } from "../../RegisterTrainee";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import Picker from "react-mobile-picker";

interface IProductFormViewProps {
  form: UseFormReturn<RegisterTraineeForm, any, undefined>;
}

const selections = {
  title: ["Mr.", "Mrs.", "Ms.", "Dr."],
  firstName: ["John", "Micheal", "Elizabeth"],
  lastName: ["Lennon", "Jackson", "Jordan", "Legend", "Taylor"],
};

export default function ProductFormView({ form }: IProductFormViewProps) {
  const [pickerValue, setPickerValue] = useState({
    title: "Mr.",
    firstName: "Micheal",
    lastName: "Jordan",
  });
  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <p className={styles.title}>상품명</p>
        <Input
          inputType="line"
          maxLength={30}
          className={styles.name_input}
          {...form.register("productName", {
            required: true,
          })}
          placeholder="상품명을 입력해주세요"
        />
      </div>

      <div className={styles.field}>
        <p className={styles.title}>기간</p>
        <div className={styles.period}>ㅁㄴㅇㅁㄴㅇㅁㄴ</div>
        <Picker value={pickerValue} onChange={setPickerValue}>
          {Object.keys(selections).map((name) => (
            <Picker.Column key={name} name={name}>
              {selections[name as keyof typeof selections].map((option) => (
                <Picker.Item key={option} value={option}>
                  {option}
                </Picker.Item>
              ))}
            </Picker.Column>
          ))}
        </Picker>
      </div>

      <div className={styles.field}>
        <p className={styles.title}>수업횟수</p>
        <Input
          inputType="line"
          maxLength={3}
          className={styles.name_input}
          {...form.register("productCount", {
            required: true,
          })}
          placeholder="수업횟수를 입력해주세요"
          type="number"
        />
      </div>

      <div className={styles.field}>
        <p className={styles.title}>금액</p>
        <Input
          inputType="line"
          maxLength={10}
          className={styles.name_input}
          {...form.register("productPrice", {
            required: true,
          })}
          placeholder="금액을 입력해주세요"
          type="number"
        />
      </div>

      <div className={styles.field}>
        <p className={styles.title}>메모</p>
        <Input
          inputType="line"
          maxLength={100}
          className={styles.name_input}
          {...form.register("memberMemo", {
            required: true,
          })}
          placeholder="회원 메모를 입력해주세요"
        />
      </div>

      <div className={styles.field}>
        <p className={styles.title}>가입 경로</p>
        <Input
          inputType="line"
          maxLength={0}
          className={styles.name_input}
          {...form.register("memberJoinPath", {
            required: true,
          })}
          placeholder="가입 경로를 선택해주세요"
        />
        {/* Input에 endAdorment 추가 */}
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
