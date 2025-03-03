import { chevronRightGrey } from "@/assets/assets";
import styles from "./WeeklyCalendar.module.scss";
import Image from "@/components/image/Image";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekday from "dayjs/plugin/weekday";
import classNames from "classnames";

dayjs.extend(weekOfYear);
dayjs.extend(weekday);
dayjs.locale("ko");

function WeeklyCalendar() {
  const getCurrentWeekText = () => {
    const now = dayjs();
    const month = now.format("M");
    const firstDayOfMonth = now.startOf("month");
    const weekOfMonth = now.week() - firstDayOfMonth.week() + 1;

    return `${month}월 ${weekOfMonth}주차`;
  };

  const getWeekDays = () => {
    const now = dayjs();
    const startOfWeek = now.startOf("week");
    const days = [];

    for (let i = 0; i < 7; i++) {
      const currentDay = startOfWeek.add(i, "day");
      days.push({
        date: currentDay.date(),
        day: currentDay.format("ddd"),
        isToday: currentDay.isSame(dayjs(), "day"),
        hasSchedule: true, // 스케줄 여부는 props로 받아와야 함
      });
    }

    return days;
  };

  return (
    <div className={styles.container}>
      <div className={styles.calendar_title}>
        {getCurrentWeekText()}{" "}
        <Image src={chevronRightGrey} width={2} height={2} />
      </div>
      <div className={styles.calendar}>
        <div className={styles.week_container}>
          {getWeekDays().map((day, index) => (
            <div
              key={index}
              className={`${styles.day_column} ${day.isToday ? styles.today : ""}`}
            >
              <div
                className={classNames(
                  styles.day_label,
                  day.day === "일" && styles.sunday,
                  day.day === "토" && styles.saturday
                )}
              >
                {day.day}
              </div>
              <div className={styles.date_circle}>{day.date}</div>
              {day.hasSchedule && (
                <div className={styles.schedule_dots}>
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeeklyCalendar;
