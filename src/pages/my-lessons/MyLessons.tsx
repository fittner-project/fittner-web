import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import styles from "./MyLessons.module.scss";

const events = [
  // 김영재 (보라)
  {
    title: "김영재",
    start: "2024-07-22T01:00:00",
    end: "2024-07-22T02:00:00",
    backgroundColor: "#b39ddb",
    borderColor: "#b39ddb",
    textColor: "#222",
  },
  {
    title: "김영재",
    start: "2024-07-22T02:00:00",
    end: "2024-07-22T03:00:00",
    backgroundColor: "#b39ddb",
    borderColor: "#b39ddb",
    textColor: "#222",
  },
  {
    title: "김영재",
    start: "2024-07-22T03:00:00",
    end: "2024-07-22T04:00:00",
    backgroundColor: "#81c784",
    borderColor: "#81c784",
    textColor: "#222",
  },
  {
    title: "김영재",
    start: "2024-07-22T04:00:00",
    end: "2024-07-22T05:00:00",
    backgroundColor: "#b39ddb",
    borderColor: "#b39ddb",
    textColor: "#222",
  },
  {
    title: "김영재",
    start: "2024-07-23T01:00:00",
    end: "2024-07-23T02:00:00",
    backgroundColor: "#b39ddb",
    borderColor: "#b39ddb",
    textColor: "#222",
  },
  // 남기현 (파랑)
  {
    title: "남기현",
    start: "2024-07-24T03:00:00",
    end: "2024-07-24T04:00:00",
    backgroundColor: "#90caf9",
    borderColor: "#90caf9",
    textColor: "#222",
  },
  {
    title: "남기현",
    start: "2024-07-22T07:00:00",
    end: "2024-07-22T08:00:00",
    backgroundColor: "#90caf9",
    borderColor: "#90caf9",
    textColor: "#222",
  },
  // 배인영 (노랑)
  {
    title: "배인영",
    start: "2024-07-22T05:00:00",
    end: "2024-07-22T06:00:00",
    backgroundColor: "#fff9c4",
    borderColor: "#fff9c4",
    textColor: "#222",
  },
  {
    title: "배인영",
    start: "2024-07-23T08:00:00",
    end: "2024-07-23T09:00:00",
    backgroundColor: "#fff9c4",
    borderColor: "#fff9c4",
    textColor: "#222",
  },
  {
    title: "배인영",
    start: "2024-07-22T08:00:00",
    end: "2024-07-22T09:00:00",
    backgroundColor: "#fff9c4",
    borderColor: "#fff9c4",
    textColor: "#222",
  },
];

const renderEventContent = (eventInfo: any) => (
  <div
    style={{
      background: eventInfo.event.backgroundColor,
      color: eventInfo.event.textColor,
      borderRadius: "8px",
      fontWeight: 700,
      fontSize: "14px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      padding: "2px 8px",
      border: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "100%",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    }}
  >
    {eventInfo.event.title}
  </div>
);

export default function MyLessons() {
  return (
    <PaddingContainer>
      <div className={styles.container}>
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView="timeGridWeek"
          locale="ko"
          headerToolbar={false}
          titleFormat={{
            year: "numeric",
            month: "long",
            day: "numeric",
          }}
          height="auto"
          slotMinTime="01:00:00"
          slotMaxTime="17:00:00"
          allDaySlot={false}
          events={events}
          eventContent={renderEventContent}
          dayHeaderFormat={{
            weekday: "short",
            day: "numeric",
          }}
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          slotDuration="01:00:00"
        />
      </div>
    </PaddingContainer>
  );
}
