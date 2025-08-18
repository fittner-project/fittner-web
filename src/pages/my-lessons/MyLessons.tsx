import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import styles from "./MyLessons.module.scss";
import MyLessonsFilter from "./components/my-lessons-filter/MyLessonsFilter";
import useMyLessonsActiveFilterStore from "./stores/my-lessons-active-filter";
import DailyLessons from "./components/daily-lessons/DailyLessons";
import useLessonStore from "@/stores/lessons";

const convertWeeklyLessonsToEvents = (weeklyLessons: any[]) => {
  const events: any[] = [];

  weeklyLessons.forEach((day) => {
    day.reservations?.forEach((reservation: any) => {
      const startDate = reservation.reservationStartDate;
      const endDate = reservation.reservationEndDate;
      const startTime = reservation.reservationStartTime;
      const endTime = reservation.reservationEndTime;

      const formattedStartDate = `${startDate.slice(0, 4)}-${startDate.slice(4, 6)}-${startDate.slice(6, 8)}`;
      const formattedEndDate = `${endDate.slice(0, 4)}-${endDate.slice(4, 6)}-${endDate.slice(6, 8)}`;

      const formattedStartTime = `${startTime.slice(0, 2)}:${startTime.slice(2, 4)}:00`;
      const formattedEndTime = `${endTime.slice(0, 2)}:${endTime.slice(2, 4)}:00`;

      const start = `${formattedStartDate}T${formattedStartTime}`;
      const end = `${formattedEndDate}T${formattedEndTime}`;

      events.push({
        id: `${reservation.memberName}_${start}`,
        title: reservation.memberName,
        start: start,
        end: end,
        backgroundColor: `#${reservation.reservationColor?.slice(6)}`,
        textColor: "#191f28",
        extendedProps: {
          memberName: reservation.memberName,
          ptnCnt: reservation.ptnCnt,
          totalCnt: reservation.totalCnt,
          reservationMemo: reservation.reservationMemo,
          reservationColor: reservation.reservationColor,
        },
      });
    });
  });

  return events;
};

const renderEventContent = (eventInfo: any) => {
  const reservationColor = eventInfo.event.extendedProps.reservationColor;

  const r = parseInt(reservationColor?.slice(6, 8) || "0", 16);
  const g = parseInt(reservationColor?.slice(8, 10) || "0", 16);
  const b = parseInt(reservationColor?.slice(10, 12) || "0", 16);
  const formatMemberName = (memberName: string) => {
    if (memberName.length > 3) {
      return memberName.slice(0, 3) + "..";
    }
    return memberName;
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
        borderRadius: "0.3rem",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        padding: "0",
        margin: "0",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "0.6rem",
          backgroundColor: `#${reservationColor?.slice(6)}`,
          borderRadius: "1rem",
        }}
      />
      <div
        style={{
          height: "100%",
          color: "#191f28",
          fontSize: "1.2rem",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {formatMemberName(eventInfo.event.title)}
      </div>
    </div>
  );
};

export default function MyLessons() {
  const tabArray: ("today" | "weekly")[] = ["today", "weekly"];
  const activeFilter = useMyLessonsActiveFilterStore(
    (state) => state.activeFilter
  );
  const setActiveFilter = useMyLessonsActiveFilterStore(
    (state) => state.setActiveFilter
  );
  const dailyLessons = useLessonStore((state) => state.dailyLessons);
  const weeklyLessons = useLessonStore((state) => state.weeklyLessons);

  console.log("weeklyLessons", weeklyLessons);

  // weeklyLessons를 FullCalendar events로 변환
  const events = convertWeeklyLessonsToEvents(weeklyLessons);

  return (
    <PaddingContainer>
      <div className={styles.container}>
        <MyLessonsFilter
          tabArray={tabArray}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        {activeFilter === "today" && dailyLessons.length !== 0 && (
          <DailyLessons />
        )}
        {activeFilter === "today" && dailyLessons.length === 0 && (
          <div className={styles.empty}>수업이 없습니다.</div>
        )}
        {activeFilter === "weekly" && (
          <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridWeek"
            locale="ko"
            timeZone="local"
            headerToolbar={false}
            titleFormat={{
              year: "numeric",
              month: "long",
              day: "numeric",
            }}
            height="100%"
            slotMinTime="00:00:00"
            slotMaxTime="24:00:00"
            allDaySlot={false}
            events={events}
            eventContent={renderEventContent}
            dayHeaderFormat={{
              weekday: "short",
              day: "numeric",
            }}
            slotLabelFormat={{
              hour: "2-digit",
              hour12: false,
            }}
            slotDuration="01:00:00"
          />
        )}
      </div>
    </PaddingContainer>
  );
}
