import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import styles from "./SignUpTerms.module.scss";
import { useGetTerms } from "@/api/generated/유저/유저";
import Image from "@/components/image/Image";
import { checkNor, checkSel } from "@/assets/assets";
import { useState } from "react";
import Button from "@/components/button/Button";
import Skeleton from "@/components/skeleton/Skeleton";
import PATH from "@/router/path";

function SignUpTerms() {
  const { data: termsData, isLoading } = useGetTerms();
  const terms = termsData?.result;
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
  const essentialTerms =
    terms?.filter((term) => term.termsEssentialYn === "Y") || [];

  const handleCheck = (termsTitle: string | undefined) => {
    if (!termsTitle) return;

    setCheckedState((prev) => ({
      ...prev,
      [termsTitle]: !prev[termsTitle],
    }));
  };

  const isAllEssentialTermsChecked = () => {
    return essentialTerms.every(
      (term) => checkedState[term.termsTitle as string] === true
    );
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

                    <Link
                      target="_BLANK"
                      to={term.termsUrl || ""}
                      className={styles.more_button}
                    >
                      더보기
                    </Link>
                  </div>
                ))}
          </div>
        </div>
        <Button
          backgroundColor="primary_1"
          fullWidth
          className={styles.next_button}
          href={PATH.SIGN_UP_PHONE_NUMBER}
          disabled={isLoading || !isAllEssentialTermsChecked()}
        >
          다음
        </Button>
      </div>
    </PaddingContainer>
  );
}

export default SignUpTerms;
