import { useForm } from "react-hook-form";
import Input from "@/components/input/Input";
import styles from "./SignUpName.module.scss";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import Button from "@/components/button/Button";
import PATH from "@/router/path";
import { storage } from "@/utils/storage";

interface SignUpNameForm {
  name: string;
}

function SignUpName() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm<SignUpNameForm>({
    mode: "onChange",
    defaultValues: {
      name:
        storage.get({
          key: "trainerName",
          type: "local",
        }) || "",
    },
  });

  const name = watch("name");

  const onSubmit = () => {
    storage.set({
      key: "trainerName",
      value: name,
      type: "local",
    });
    navigate(PATH.FIND_CENTERS);
  };

  return (
    <PaddingContainer>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <div className={styles.content}>
          <p className={styles.title}>이름을 입력해주세요</p>
          <Input
            inputType="line"
            className={styles.name_input}
            {...register("name", {
              required: true,
            })}
          />
        </div>
        <Button
          type="submit"
          backgroundColor="primary_1"
          fullWidth
          className={styles.next_button}
          disabled={!name}
        >
          다음
        </Button>
      </form>
    </PaddingContainer>
  );
}

export default SignUpName;
