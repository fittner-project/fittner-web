import { create } from "zustand";
import dayjs from "dayjs";

// 날짜별 상태 타입
export type LessonStatus = {
  date: string; // YYYY-MM-DD 형식
  status: "김영재" | "김당재" | "남기연"; // 필요한 상태값들
  tags?: string[]; // 추가적인 태그들
};

interface CalendarStore {
  // 날짜별 상태를 저장하는 맵
  lessonStatuses: Record<string, LessonStatus>;

  // 날짜 상태 추가/수정
  setLessonStatus: (status: LessonStatus) => void;

  // 날짜 상태 제거
  removeLessonStatus: (date: string) => void;

  // 특정 날짜의 상태 조회
  getLessonStatus: (date: string) => LessonStatus | undefined;

  // 특정 월의 모든 상태 조회
  getMonthLessonStatuses: (year: number, month: number) => LessonStatus[];
}

const useCalendarStore = create<CalendarStore>((set, get) => ({
  lessonStatuses: {},

  setLessonStatus: (status) => {
    set((state) => ({
      lessonStatuses: {
        ...state.lessonStatuses,
        [status.date]: status,
      },
    }));
  },

  removeLessonStatus: (date) => {
    set((state) => {
      const newStatuses = { ...state.lessonStatuses };
      delete newStatuses[date];
      return { lessonStatuses: newStatuses };
    });
  },

  getLessonStatus: (date) => {
    return get().lessonStatuses[date];
  },

  getMonthLessonStatuses: (year, month) => {
    const startDate = dayjs().year(year).month(month).startOf("month");
    const endDate = startDate.endOf("month");

    return Object.values(get().lessonStatuses).filter((status) => {
      const statusDate = dayjs(status.date);
      return statusDate.isAfter(startDate) && statusDate.isBefore(endDate);
    });
  },
}));

export default useCalendarStore;
