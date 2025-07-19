import { MemberListResDto } from "@/api/generated/models";
import { storageKeys } from "@/constants/storageKeys";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface RegisterLessonValues {
  memberInfo: MemberListResDto | null;
  ticketId: string;
  reservationStartDate: string;
  reservationEndDate: string;
  reservationStartTime: string;
  reservationEndTime: string;
  reservationColor: string;
  reservationPush: string;
  reservationMemo: string;
}

interface RegisterLessonValuesStore {
  registerLessonValues: RegisterLessonValues;
  setRegisterLessonValues: (values: Partial<RegisterLessonValues>) => void;
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
        reservationColor: "",
        reservationPush: "",
        reservationMemo: "",
      },
      setRegisterLessonValues: (values: Partial<RegisterLessonValues>) =>
        set((state) => ({
          registerLessonValues: {
            ...state.registerLessonValues,
            ...values,
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
