import { create } from "zustand";
import { GroupedReservationMemberDto } from "@/api/generated/models";

interface LessonStore {
  dailyLessons: GroupedReservationMemberDto[];

  weeklyLessons: GroupedReservationMemberDto[];
  setDailyLessons: (lessons: GroupedReservationMemberDto[]) => void;
  setWeeklyLessons: (lessons: GroupedReservationMemberDto[]) => void;
}

const useLessonStore = create<LessonStore>((set) => ({
  dailyLessons: [],
  weeklyLessons: [],

  setDailyLessons: (lessons) => {
    set({ dailyLessons: lessons });
  },

  setWeeklyLessons: (lessons) => {
    set({ weeklyLessons: lessons });
  },
}));

export default useLessonStore;
