import styles from "./DailyLessonBottomSheet.module.scss";
import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import dayjs from "dayjs";
import "dayjs/locale/ko"; // 한국어 로케일
import Row from "@/components/flex/Row";
import Image from "@/components/image/Image";
import { registration } from "@/assets/assets";

interface DailyLessonBottomSheetProps {
  date: Date;
}

export default function DailyLessonBottomSheet({
  date,
}: DailyLessonBottomSheetProps) {
  const formattedDate = dayjs(date).locale("ko").format("M월 D일 dddd"); // 예: "12월 22일 일요일"

  return (
    <BottomSheet>
      <div className={styles.container}>
        <Row justifyContent="space-between">
          <div className={styles.date}>{formattedDate}</div>
          <div>
            <Image src={registration} width={2.6} height={2.6} />
          </div>
        </Row>
      </div>
    </BottomSheet>
  );
}
