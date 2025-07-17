import { create } from "zustand";
import { GroupedReservationMemberDto } from "@/api/generated/models";

interface CalendarStore {
  //현재 날짜가 포함된 달에 해당하는 수업들
  lessons: GroupedReservationMemberDto[];
  //현재 날짜가 포함된 주에 해당하는 수업들
  weeklyLessons: GroupedReservationMemberDto[];
  setLessons: (lessons: GroupedReservationMemberDto[]) => void;
  setWeeklyLessons: (lessons: GroupedReservationMemberDto[]) => void;
}

const useCalendarStore = create<CalendarStore>((set) => ({
  lessons: [],
  weeklyLessons: [],

  setLessons: (lessons) => {
    set({ lessons });
  },

  setWeeklyLessons: (lessons) => {
    set({ weeklyLessons: lessons });
  },
}));

export default useCalendarStore;
