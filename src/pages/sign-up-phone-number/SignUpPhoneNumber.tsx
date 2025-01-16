import { useForm } from "react-hook-form";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import styles from "./SignUpPhoneNumber.module.scss";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import formatPhoneNumber from "@/utils/formatPhoneNumber";
import PATH from "@/router/path";

interface SignUpPhoneNumberForm {
  phoneNumber: string;
}

function SignUpPhoneNumber() {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch } =
    useForm<SignUpPhoneNumberForm>({
      mode: "onChange",
    });

  const phoneNumber = watch("phoneNumber");

  const isPhoneNumberComplete =
    phoneNumber?.replace(/[^0-9]/g, "").length === 11;

  const onSubmit = () => {
    navigate(PATH.SIGN_UP_NAME);
  };

  return (
    <PaddingContainer>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <div className={styles.content}>
          <p className={styles.title}>휴대폰 번호를 입력해주세요</p>
          <p className={styles.sub_title}>본인 인증을 위해 필요합니다</p>
          <Input
            type="line"
            className={styles.phone_number_input}
            {...register("phoneNumber", {
              required: "휴대폰 번호를 입력해주세요",
              pattern: {
                value: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
                message: "올바른 휴대폰 번호를 입력해주세요",
              },
              onChange: (e) => {
                const formatted = formatPhoneNumber({ value: e.target.value });
                setValue("phoneNumber", formatted);
              },
            })}
            maxLength={13}
          />
        </div>
        <Button
          type="submit"
          backgroundColor="primary_1"
          fullWidth
          className={styles.next_button}
          disabled={!isPhoneNumberComplete}
        >
          확인
        </Button>
      </form>
    </PaddingContainer>
  );
}

export default SignUpPhoneNumber;
