import PaddingContainer from "@/layout/containers/padding-container/PaddingContainer";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import styles from "./MyLessons.module.scss";
import MyLessonsFilter from "./components/my-lessons-filter/MyLessonsFilter";
import useMyLessonsActiveFilterStore from "./stores/my-lessons-active-filter";
import DailyLessons from "./components/daily-lessons/DailyLessons";

const events = [
  {
    title: "테스트",
    start: "2024-07-22T03:00:00",
    end: "2024-07-22T04:00:00",
  },
];

const renderEventContent = (eventInfo: any) => (
  <div>{eventInfo.event.title}</div>
);

export default function MyLessons() {
  const tabArray: ("today" | "weekly")[] = ["today", "weekly"];
  const activeFilter = useMyLessonsActiveFilterStore(
    (state) => state.activeFilter
  );
  const setActiveFilter = useMyLessonsActiveFilterStore(
    (state) => state.setActiveFilter
  );

  return (
    <PaddingContainer>
      <div className={styles.container}>
        <MyLessonsFilter
          tabArray={tabArray}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        {activeFilter === "today" && <DailyLessons />}
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
              minute: "2-digit",
              hour12: false,
            }}
            slotDuration="01:00:00"
          />
        )}
      </div>
    </PaddingContainer>
  );
}
