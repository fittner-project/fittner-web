import { chevronRightGrey } from "@/assets/assets";
import styles from "./WeeklyCalendar.module.scss";
import Image from "@/components/image/Image";
import dayjs from "dayjs";
import "dayjs/locale/ko"; // 한국어 로케일 추가

function WeeklyCalendar() {
  const getCurrentWeekText = () => {
    const now = dayjs();
    const month = now.format("M"); // 현재 월
    const weekOfMonth = Math.ceil(now.date() / 7); // 현재 주차 계산

    return `${month}월 ${weekOfMonth}주차`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.calendar_title}>
        {getCurrentWeekText()}{" "}
        <Image src={chevronRightGrey} width={2} height={2} />
      </div>
      <div className={styles.calendar}>d</div>
    </div>
  );
}

export default WeeklyCalendar;
