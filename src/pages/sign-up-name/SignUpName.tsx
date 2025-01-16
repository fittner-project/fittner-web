import Input from "@/components/input/Input";
import styles from "./SignUpName.module.scss";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import Button from "@/components/button/Button";

function SignUpName() {
  const [name, setName] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <PaddingContainer>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.title}>이름을 입력해주세요</p>
          <Input
            type="line"
            fullWidth
            className={styles.name_input}
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <Button
          backgroundColor="primary_1"
          fullWidth
          className={styles.next_button}
          disabled={!name}
        >
          다음
        </Button>
      </div>
    </PaddingContainer>
  );
}

export default SignUpName;
