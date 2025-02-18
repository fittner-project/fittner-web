import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./RegistrationPathBottomSheet.module.scss";
import { closeBottomSheet } from "@/utils/bottomSheet";

interface RegistrationPathBottomSheetProps {
  onSelect: (path: string) => void;
}

export default function RegistrationPathBottomSheet({
  onSelect,
}: RegistrationPathBottomSheetProps) {
  const handleSelect = (path: string) => {
    onSelect(path);
    closeBottomSheet();
  };

  return (
    <BottomSheet>
      <div className={styles.container}>
        <div className={styles.title}>
          <div>가입경로</div>
        </div>

        <div className={styles.content}>
          <div
            className={styles.content_item}
            onClick={() => handleSelect("인터넷")}
          >
            인터넷
          </div>
          <div
            className={styles.content_item}
            onClick={() => handleSelect("지인 소개")}
          >
            지인 소개
          </div>
          <div
            className={styles.content_item}
            onClick={() => handleSelect("SNS 광고")}
          >
            SNS 광고
          </div>
          <div
            className={styles.content_item}
            onClick={() => handleSelect("기타")}
          >
            기타
          </div>
        </div>
      </div>
    </BottomSheet>
  );
}
