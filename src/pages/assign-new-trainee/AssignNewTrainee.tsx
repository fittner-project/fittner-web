import { useForm } from "react-hook-form";
import styles from "./AssignNewTrainee.module.scss";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import Row from "@/components/flex/Row";
import classNames from "classnames";
import { MotionDiv } from "@/components/animation/Motion";
import useHandleBackInject from "@/hooks/useHandleBackInject";
import TraineeFormView from "./components/trainee-form-view/TraineeFormView";
import ProductFormView from "./components/product-form-view/ProductFormView";

export type RegisterTraineeForm = {
  centerId: string;
  centerName: string;
  trainerId: string;
  trainerName: string;
  memberName: string;
  memberPhone: string;
  memberGender: "M" | "F";
  memberBirth: string;
  memberAddress: string;
  productName: string;
  productStartDate: string;
  productEndDate: string;
  productCount: string;
  productPrice: string;
  memberMemo: string;
  memberJoinPath: string;
};

export default function RegisterTrainee() {
  const [step, setStep] = useState<1 | 2>(1);
  const navigate = useNavigate();
  const form = useForm<RegisterTraineeForm>({
    mode: "onChange",
  });
  const [showNextButtonAnimation, setShowNextButtonAnimation] = useState(true);

  useEffect(() => {
    if (step === 2) {
      setShowNextButtonAnimation(false);
    }
  }, [step]);

  useHandleBackInject(() => {
    if (step === 1) {
      navigate(-1);
      return;
    } else {
      setStep(1);
      return;
    }
  }, [step]);

  return (
    <PaddingContainer>
      <div className={styles.container}>
        <Row justifyContent="space-between">
          <div className={styles.title}>
            {step === 1 ? "양도 회원 등록" : "양도 상품 등록"}
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
            <MotionDiv
              className={styles.menu_container}
              transition={{ duration: 0.4, delay: 0.6 }}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <TraineeFormView
                form={form}
                setStep={setStep}
                showNextButtonAnimation={showNextButtonAnimation}
              />
            </MotionDiv>
          ) : (
            <MotionDiv
              className={styles.menu_container}
              transition={{ duration: 0.4, delay: 0.3 }}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <ProductFormView form={form} />
            </MotionDiv>
          )}
        </form>
      </div>
    </PaddingContainer>
  );
}
