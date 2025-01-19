import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import styles from "./SignUpTerms.module.scss";
import Image from "@/components/image/Image";
import { checkNor, checkSel } from "@/assets/assets";
import { useState, useEffect } from "react";
import Button from "@/components/button/Button";
import Skeleton from "@/components/skeleton/Skeleton";
import PATH from "@/router/path";
import { useNavigate } from "react-router-dom";
import { storage } from "@/utils/storage";
import { useGetJoinTerms } from "@/api/generated/유저/유저";
import { storageKeys } from "@/constants/storage";

function SignUpTerms() {
  const { data: termsData, isLoading } = useGetJoinTerms();
  const terms = termsData?.result;
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
  const essentialTerms =
    terms?.filter((term) => term.termsEssentialYn === "Y") || [];
  const navigate = useNavigate();

  useEffect(() => {
    const savedCheckedState = storage.get<Record<string, boolean>>({
      key: storageKeys.termsAgreement,
      type: "local",
    });
    if (savedCheckedState) {
      setCheckedState(savedCheckedState);
    }
  }, []);

  const handleCheck = (termsTitle: string | undefined) => {
    if (!termsTitle) return;

    const newCheckedState = {
      ...checkedState,
      [termsTitle]: !checkedState[termsTitle],
    };

    setCheckedState(newCheckedState);
    storage.set({
      key: storageKeys.termsAgreement,
      value: newCheckedState,
      type: "local",
    });
  };

  const isAllEssentialTermsChecked = () => {
    return essentialTerms.every(
      (term) => checkedState[term.termsTitle as string] === true
    );
  };

  const handleNext = () => {
    if (isAllEssentialTermsChecked()) {
      storage.set({
        key: storageKeys.termsAgreement,
        value: checkedState,
        type: "local",
      });
      navigate(PATH.SIGN_UP_PHONE_NUMBER);
    }
  };

  return (
    <PaddingContainer>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.title}>
            서비스 가입을 위해 먼저 <br />
            기업 및 정보 제공에 동의해주세요
          </p>

          <div className={styles.terms_container}>
            {isLoading
              ? Array.from({ length: terms?.length || 3 }).map((_, index) => (
                  <div key={index} className={styles.term}>
                    <div className={styles.term_content}>
                      <Skeleton width={2.2} height={2.2} borderRadius={1000} />
                      <Skeleton width={15} height={2.2} borderRadius={0.4} />
                    </div>
                    <Skeleton width={4} height={2.2} borderRadius={0.4} />
                  </div>
                ))
              : terms?.map((term) => (
                  <div key={term.termsTitle} className={styles.term}>
                    <div
                      onClick={() => handleCheck(term.termsTitle)}
                      className={styles.term_content}
                    >
                      <Image
                        width={1.6}
                        height={1.6}
                        src={
                          checkedState[term.termsTitle as string]
                            ? checkSel
                            : checkNor
                        }
                        alt="check"
                      />
                      <p className={styles.term_title}>{term.termsTitle}</p>
                    </div>

                    <p
                      onClick={() => (location.href = term.termsUrl || "")}
                      className={styles.more_button}
                    >
                      더보기
                    </p>
                  </div>
                ))}
          </div>
        </div>
        <Button
          backgroundColor="primary_1"
          fullWidth
          className={styles.next_button}
          onClick={handleNext}
          disabled={isLoading || !isAllEssentialTermsChecked()}
        >
          다음
        </Button>
      </div>
    </PaddingContainer>
  );
}

export default SignUpTerms;
