import styles from "./WeeklyLessonBottomSheet.module.scss";
import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import dayjs from "dayjs";
import "dayjs/locale/ko"; // 한국어 로케일
import Row from "@/components/flex/Row";
import Image from "@/components/image/Image";
import { registration } from "@/assets/assets";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekday from "dayjs/plugin/weekday";
import PATH from "@/router/path";

dayjs.extend(weekOfYear);
dayjs.extend(weekday);
dayjs.locale("ko");

interface DailyLessonBottomSheetProps {
  date: Date;
}

export default function WeeklyLessonBottomSheet({
  date,
}: DailyLessonBottomSheetProps) {
  const navigate = useNavigate();
  const formattedDate = dayjs(date).locale("ko").format("M월 D일 dddd"); // 예: "12월 22일 일요일"

  // 현재 날짜 기준의 주차 정보
  const getWeekInfo = () => {
    const now = dayjs();
    const year = now.format("YYYY");
    const month = now.format("M");
    const weekOfMonth = Math.ceil(now.date() / 7);

    return `${year}년 ${month}월 ${weekOfMonth}주차`;
  };

  // 현재 주의 시작일과 종료일
  const getWeekRange = () => {
    const now = dayjs();
    const startOfWeek = now.startOf("week");
    const endOfWeek = now.endOf("week");

    return `${startOfWeek.format("M.D")}(${startOfWeek.format("ddd")}) ~ ${endOfWeek.format("M.D")}(${endOfWeek.format("ddd")})`;
  };

  const weekInfo = getWeekInfo(); // 예: "2024년 12월 4주차"
  const weekRange = getWeekRange(); // 예: "12.22(일) ~ 12.28(토)"

  return (
    <BottomSheet>
      <div className={styles.container}>
        <Row justifyContent="space-between">
          <div className={styles.date}>{weekInfo}</div>
          <div>
            <Image
              src={registration}
              width={2.6}
              height={2.6}
              onClick={() => navigate(PATH.REGISTER_LESSON)}
            />
          </div>
        </Row>
        <div className={styles.week_range}>{weekRange}</div>
      </div>
    </BottomSheet>
  );
}
