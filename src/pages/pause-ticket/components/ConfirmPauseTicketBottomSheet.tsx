import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./ConfirmPauseTicketBottomSheet.module.scss";
import Image from "@/components/image/Image";
import { infoCircle } from "@/assets/assets";
import Button from "@/components/button/Button";
import { closeBottomSheet } from "@/utils/bottomSheet";

interface ConfirmPauseTicketBottomSheetProps {
  onSubmit: () => void;
}

export default function ConfirmPauseTicketBottomSheet({
  onSubmit,
}: ConfirmPauseTicketBottomSheetProps) {
  return (
    <BottomSheet>
      <div className={styles.container}>
        <p className={styles.title}>
          <span>이용 정지 신청</span> 하시겠습니까?
        </p>
        <div className={styles.info_section}>
          <Image src={infoCircle} alt="info" width={2} height={2} />
          <p>관리자 승인 후 정지됩니다.</p>
        </div>
        <div className={styles.button_section}>
          <Button
            backgroundColor="grey_1"
            fullWidth
            onClick={() => closeBottomSheet()}
          >
            취소
          </Button>
          <Button backgroundColor="primary_1" fullWidth onClick={onSubmit}>
            신청
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}
