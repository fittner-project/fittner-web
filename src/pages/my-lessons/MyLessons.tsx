import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import styles from "./MyLessons.module.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useCallback } from "react";
import useCalendarStore from "@/store/calendar";
import { openBottomSheet } from "@/utils/bottomSheet";
import DailyLessonBottomSheet from "./components/daily-lesson-bottom-sheet/DailyLessonBottomSheet";

export default function MyLessons() {
  const weeklyLessons = useCalendarStore((state) => state.weeklyLessons);

  const handleDatesSet = useCallback((arg: any) => {
    console.log("현재 보여지는 달:", arg.view.title);
  }, []);

  const handleDateClick = (date: Date) => {
    openBottomSheet({
      component: DailyLessonBottomSheet,
      props: {
        date: date,
      },
    });
  };

  const renderDayCellContent = ({ date, dayNumberText }: any) => {
    const dayStr = date.getDate().toString().padStart(2, "0");
    const dayLessons =
      weeklyLessons.find((day) => day.lastTwoDigits === dayStr)?.reservations ||
      [];

    return (
      <div className={styles.day_cell} onClick={() => handleDateClick(date)}>
        <div>{dayNumberText.replace("일", "")}</div>
        {dayLessons.map((lesson, idx) => (
          <div
            key={idx}
            className={styles.lesson_tag}
            style={{ backgroundColor: lesson.reservationColor }}
          >
            {lesson.memberName}
          </div>
        ))}
      </div>
    );
  };

  return (
    <PaddingContainer>
      <div className={styles.container}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale="ko"
          headerToolbar={{
            start: "prev",
            center: "title",
            end: "next",
          }}
          titleFormat={{
            year: "numeric",
            month: "long",
          }}
          height="auto"
          datesSet={handleDatesSet}
          dayHeaderFormat={{
            weekday: "short",
          }}
          dayCellContent={renderDayCellContent}
        />
      </div>
    </PaddingContainer>
  );
}
