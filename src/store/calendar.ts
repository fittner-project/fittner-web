import { create } from "zustand";
import dayjs from "dayjs";
import { GroupedReservationMemberDto } from "@/api/generated/models";

interface CalendarStore {
  lessons: GroupedReservationMemberDto[];
  setLessons: (lessons: GroupedReservationMemberDto[]) => void;

  //   // 특정 날짜에 해당하는 수업들 조회
  //   getLessonsByDate: (date: string) => GroupedReservationMemberDto[];

  //   // 특정 월에 해당하는 수업들 조회
  //   getMonthLessons: (
  //     year: number,
  //     month: number
  //   ) => GroupedReservationMemberDto[];
}

const useCalendarStore = create<CalendarStore>((set, get) => ({
  lessons: [],

  setLessons: (lessons) => {
    set({ lessons });
  },

  //   getLessonsByDate: (date) => {
  //     const targetDate = dayjs(date);
  //     return get().lessons.filter((lesson) => {
  //       const start = dayjs(lesson.startDate);
  //       const end = dayjs(lesson.endDate);
  //       return targetDate.isSameOrAfter(start) && targetDate.isSameOrBefore(end);
  //     });
  //   },

  //   getMonthLessons: (year, month) => {
  //     const startOfMonth = dayjs().year(year).month(month).startOf("month");
  //     const endOfMonth = startOfMonth.endOf("month");

  //     return get().lessons.filter((lesson) => {
  //       const lessonStart = dayjs(lesson.startDate);
  //       const lessonEnd = dayjs(lesson.endDate);

  //       // 해당 월에 걸쳐있는 수업들 반환
  //       return (
  //         lessonStart.isSameOrBefore(endOfMonth) &&
  //         lessonEnd.isSameOrAfter(startOfMonth)
  //       );
  //     });
  //   },
}));

export default useCalendarStore;
