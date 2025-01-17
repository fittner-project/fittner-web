import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import { CenterListResDto } from "@/api/generated/models";
import styles from "./SelectCenterBottomSheet.module.scss";
import Image from "@/components/image/Image";
import { infoCircle } from "@/assets/assets";
import Button from "@/components/button/Button";
import { closeBottomSheet } from "@/utils/bottomSheet";

interface SelectCenterBottomSheetProps {
  center: CenterListResDto;
}

function SelectCenterBottomSheet({ center }: SelectCenterBottomSheetProps) {
  return (
    <BottomSheet>
      <div className={styles.container}>
        <p className={styles.center_name_section}>
          <span className={styles.center_name}>{center.centerName}</span>
          <br />
          센터 등록 하시겠습니까?
        </p>
        <p className={styles.description_1}>
          연동 신청 시 트레이너님의 <br />
          성함과 연락처가 전달됩니다.
        </p>
        <div className={styles.description_2_section}>
          <Image src={infoCircle} alt="info" width={2} height={2} />
          <p className={styles.description_2}>
            최종 관리자 승인 후 센터등록이 완료 됩니다.
          </p>
        </div>
        <div className={styles.button_section}>
          <Button
            backgroundColor="grey_1"
            fullWidth
            onClick={() => closeBottomSheet()}
          >
            취소
          </Button>
          <Button backgroundColor="primary_1" fullWidth>
            신청
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}

export default SelectCenterBottomSheet;
