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
import { Link } from "react-router-dom";

import { storageKeys } from "@/constants/storageKeys";
import { TermsResDto } from "@/api/generated/models";
import { useGetUserTerms } from "@/api/generated/유저/유저";

function SignUpTerms() {
  const { data: termsData, isLoading } = useGetUserTerms();
  const terms = termsData?.result;
  const [checkedTerms, setCheckedTerms] = useState<TermsResDto[]>([]);

  const essentialTerms =
    terms?.filter((term) => term.termsEssentialYn === "Y") || [];
  const navigate = useNavigate();

  useEffect(() => {
    if (terms) {
      storage.set({
        key: storageKeys.terms,
        value: terms,
        type: "local",
      });
    }
  }, [terms]);

  useEffect(() => {
    const savedCheckedTerms = storage.get<TermsResDto[]>({
      key: storageKeys.termsAgreement,
      type: "local",
    });
    if (savedCheckedTerms) {
      setCheckedTerms(savedCheckedTerms);
    }
  }, []);

  const handleCheck = (term: TermsResDto) => {
    if (!term) return;

    setCheckedTerms((prev) => {
      const isChecked = prev.some(
        (checkedTerm) => checkedTerm.termsTitle === term.termsTitle
      );
      const newCheckedTerms = isChecked
        ? prev.filter(
            (checkedTerm) => checkedTerm.termsTitle !== term.termsTitle
          )
        : [...prev, term];

      storage.set({
        key: storageKeys.termsAgreement,
        value: newCheckedTerms,
        type: "local",
      });

      return newCheckedTerms;
    });
  };

  const handleAllCheck = () => {
    if (!terms) return;

    const isAllChecked = terms.length === checkedTerms.length;
    const newCheckedTerms = isAllChecked ? [] : [...terms];

    setCheckedTerms(newCheckedTerms);
    storage.set({
      key: storageKeys.termsAgreement,
      value: newCheckedTerms,
      type: "local",
    });
  };

  const isAllEssentialTermsChecked = () => {
    return essentialTerms.every((term) =>
      checkedTerms.some(
        (checkedTerm) => checkedTerm.termsTitle === term.termsTitle
      )
    );
  };

  const handleNext = () => {
    if (isAllEssentialTermsChecked()) {
      navigate(PATH.SIGN_UP.PHONE_NUMBER);
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
            {isLoading ? (
              Array.from({ length: (terms?.length || 3) + 1 }).map(
                (_, index) => (
                  <div key={index} className={styles.term}>
                    <div className={styles.term_content}>
                      <Skeleton width={2.2} height={2.2} borderRadius={1000} />
                      <Skeleton width={15} height={2.2} borderRadius={0.4} />
                    </div>
                    {index === 0 && (
                      <Skeleton width={4} height={2.2} borderRadius={0.4} />
                    )}
                  </div>
                )
              )
            ) : (
              <>
                <div className={styles.term}>
                  <div onClick={handleAllCheck} className={styles.term_content}>
                    <Image
                      width={1.6}
                      height={1.6}
                      src={
                        terms?.length === checkedTerms.length
                          ? checkSel
                          : checkNor
                      }
                      alt="check"
                    />
                    <p className={styles.term_title}>전체 동의</p>
                  </div>
                </div>
                {terms?.map((term) => (
                  <div key={term.termsTitle} className={styles.term}>
                    <div
                      onClick={() => handleCheck(term)}
                      className={styles.term_content}
                    >
                      <Image
                        width={1.6}
                        height={1.6}
                        src={
                          checkedTerms.some(
                            (checkedTerm) =>
                              checkedTerm.termsTitle === term.termsTitle
                          )
                            ? checkSel
                            : checkNor
                        }
                        alt="check"
                      />
                      <p className={styles.term_title}>{term.termsTitle}</p>
                    </div>

                    <Link
                      to={`${encodeURIComponent(term.termsUrl || "")}`}
                      className={styles.more_button}
                    >
                      더보기
                    </Link>
                  </div>
                ))}
              </>
            )}
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
