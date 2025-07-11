import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import styles from "./AssignNewTrainee.module.scss";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import Row from "@/components/flex/Row";
import classNames from "classnames";

import TraineeFormView from "./components/trainee-form-view/TraineeFormView";
import ProductFormView from "./components/product-form-view/ProductFormView";
import { storageKeys } from "@/constants/storageKeys";

export type RegisterTraineeForm = {
  originalTicketId: string;
  centerId: string;
  trainerId: string;
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

  useFormPersist(storageKeys.assignNewTraineeFormValues, {
    watch: form.watch,
    setValue: form.setValue,
    storage: window.sessionStorage,
  });

  useEffect(() => {
    const handlePopState = () => {
      if (step === 2) {
        setStep(1);
      } else {
        form.reset();
        sessionStorage.removeItem(storageKeys.assignNewTraineeFormValues);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [step, navigate, form]);

  useEffect(() => {
    if (step === 2) {
      window.history.pushState(null, "", window.location.href);
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
            <div className={styles.menu_container}>
              <TraineeFormView form={form} setStep={setStep} />
            </div>
          ) : (
            <div className={styles.menu_container}>
              <ProductFormView form={form} />
            </div>
          )}
        </form>
      </div>
    </PaddingContainer>
  );
}
