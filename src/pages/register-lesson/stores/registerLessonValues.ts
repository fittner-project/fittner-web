import { Color, MemberListResDto } from "@/api/generated/models";
import { storageKeys } from "@/constants/storageKeys";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface RegisterLessonValues {
  memberInfo: MemberListResDto | null;
  ticketId: string;
  reservationStartDate: string;
  reservationEndDate: string;
  reservationStartTime: string;
  reservationEndTime: string;
  reservationColor: Color | null;
  reservationPush: string;
  reservationMemo: string;
  reservationPushTime:
    | string
    | "before_reservation"
    | "before_5m"
    | "before_10m"
    | "before_15m";
}

interface RegisterLessonValuesStore {
  registerLessonValues: RegisterLessonValues;
  setRegisterLessonValues: (values: Partial<RegisterLessonValues>) => void;
  reset: () => void;
}

const useRegisterLessonValuesStore = create(
  persist<RegisterLessonValuesStore>(
    (set, _get) => ({
      registerLessonValues: {
        memberInfo: null,
        ticketId: "",
        reservationStartDate: "",
        reservationEndDate: "",
        reservationStartTime: "",
        reservationEndTime: "",
        reservationColor: null,
        reservationPush: "",
        reservationMemo: "",
        reservationPushTime: "",
      },
      setRegisterLessonValues: (values: Partial<RegisterLessonValues>) =>
        set((state) => ({
          registerLessonValues: {
            ...state.registerLessonValues,
            ...values,
          },
        })),
      reset: () =>
        set(() => ({
          registerLessonValues: {
            memberInfo: null,
            ticketId: "",
            reservationStartDate: "",
            reservationEndDate: "",
            reservationStartTime: "",
            reservationEndTime: "",
            reservationColor: null,
            reservationPush: "",
            reservationMemo: "",
            reservationPushTime: "",
          },
        })),
    }),
    {
      name: storageKeys.registerLessonValues,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useRegisterLessonValuesStore;
