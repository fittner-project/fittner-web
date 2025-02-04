import Image from "@/components/image/Image";
import styles from "./SignUpComplete.module.scss";
import Button from "@/components/button/Button";
import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import PATH from "@/router/path";
import { celebration } from "@/assets/assets";

export default function SignUpComplete() {
  return (
    <PaddingContainer>
      <div className={styles.container}>
        <div className={styles.content}>
          <Image src={celebration} alt="회원가입 완료" width={16} height={16} />
          <p className={styles.title}>회원가입이 완료되었습니다</p>
          <p className={styles.description}>
            최종 관리자 승인 후 서비스 이용이 가능합니다
          </p>
        </div>

        <Button href={PATH.CENTER_LIST} backgroundColor="primary_1" fullWidth>
          승인 내역 보기
        </Button>
      </div>
    </PaddingContainer>
  );
}
