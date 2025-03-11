import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import styles from "./MyLessons.module.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useCallback } from "react";

export default function MyLessons() {
  const handleDatesSet = useCallback((arg: any) => {
    console.log("현재 보여지는 달:", arg.view.title);
  }, []);

  return (
    <PaddingContainer>
      <div className={styles.container}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale="ko" // 한글 설정
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
          dayCellContent={({ date, dayNumberText }) => {
            return dayNumberText.replace("일", "");
          }}
        />
      </div>
    </PaddingContainer>
  );
}
