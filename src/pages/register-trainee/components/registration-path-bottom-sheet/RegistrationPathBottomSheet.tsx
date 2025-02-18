import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./RegistrationPathBottomSheet.module.scss";

export default function RegistrationPathBottomSheet() {
  const navigate = useNavigate();
  return (
    <BottomSheet>
      <div className={styles.container}>
        <div className={styles.title}>
          <div>가입경로</div>
        </div>

        <div className={styles.content}>
          <div className={styles.content_item}>인터넷</div>
          <div className={styles.content_item}>지인 소개</div>
          <div className={styles.content_item}>SNS 광고</div>
          <div className={styles.content_item}>기타</div>
        </div>
      </div>
    </BottomSheet>
  );
}
