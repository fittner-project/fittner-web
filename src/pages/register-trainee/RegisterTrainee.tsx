import { useForm } from "react-hook-form";
import styles from "./RegisterTrainee.module.scss";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import TraineeFormView from "./components/trainee-form-view/TraineeFormView";
import ProductFormView from "./components/product-form-view/ProductFormView";
import Row from "@/components/flex/Row";
import classNames from "classnames";

export type RegisterTraineeForm = {
  memberName: string;
  memberPhone: string;
  memberGender: "M" | "F";
  memberBirth: string;
  memberAddress: string;
  productName: string;
  productStartDate: string;
  productEndDate: string;
  productCount: number;
  productPrice: number;
  memberMemo: string;
  memberJoinPath: string;
};

export default function RegisterTrainee() {
  const [step, setStep] = useState<1 | 2>(1);
  const form = useForm<RegisterTraineeForm>({
    mode: "onChange",
  });

  return (
    <PaddingContainer>
      <div className={styles.container}>
        <Row justifyContent="space-between">
          <div className={styles.title}>
            {step === 1 ? "회원 등록" : "상품 등록"}
          </div>
          <Row gap="0.8rem">
            <div
              className={classNames(styles.step, step === 1 && styles.active)}
              onClick={() => setStep(1)}
            >
              1
            </div>
            <Row className={styles.dot_container} gap="0.4rem">
              <div className={styles.dot} />
              <div className={styles.dot} />
              <div className={styles.dot} />
            </Row>
            <div
              className={classNames(styles.step, step === 2 && styles.active)}
            >
              2
            </div>
          </Row>
        </Row>
        <form className={styles.container}>
          {step === 1 ? (
            <TraineeFormView form={form} setStep={setStep} />
          ) : (
            <ProductFormView form={form} />
          )}
        </form>
      </div>
    </PaddingContainer>
  );
}
