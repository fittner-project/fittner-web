import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import styles from "./RefundBlockBottomSheet.module.scss";
import Image from "@/components/image/Image";
import { infoCircle } from "@/assets/assets";
import Button from "@/components/button/Button";
import { closeBottomSheet } from "@/utils/bottomSheet";

export default function RefundBlockBottomSheet() {
  return (
    <BottomSheet>
      <div className={styles.container}>
        <div className={styles.title}>
          예약 중인 수업이 있어 <br /> 환불신청을 진행할 수 없습니다
        </div>

        <div className={styles.description_section}>
          <Image src={infoCircle} alt="info" width={2} height={2} />
          <p className={styles.description}>
            예약된 수업이 있다면 일정을 삭제해주세요.
          </p>
        </div>

        <Button
          onClick={() => closeBottomSheet()}
          backgroundColor="primary_1"
          fullWidth
        >
          확인
        </Button>
      </div>
    </BottomSheet>
  );
}
