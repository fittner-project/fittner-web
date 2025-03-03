import {
  CenterInfo,
  DefaultInfo,
  GroupedReservationMemberDto,
  ReservationColorResDto,
} from "@/api/generated/models";
import { storageKeys } from "@/constants/storageKeys";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUserDispatcher {
  setUserInfo: (userInfo: DefaultInfo) => void;
  setSelectedCenter: (center: CenterInfo) => void;
  setReservationColors: (reservationColors: ReservationColorResDto) => void;
  setCurrentMonthReservations: (
    reservations: GroupedReservationMemberDto[]
  ) => void;
}

interface UserStore extends IUserDispatcher {
  userInfo: DefaultInfo;
  selectedCenter: CenterInfo;
  reservationColors: ReservationColorResDto;
  currentMonthreservations: GroupedReservationMemberDto[];
}

export const useUserStore = create(
  persist<UserStore>(
    (set, _get) => ({
      userInfo: {},
      selectedCenter: {},
      reservationColors: {},
      currentMonthreservations: [],
      setUserInfo: (userInfo: DefaultInfo) => set({ userInfo }),
      setSelectedCenter: (center: CenterInfo) =>
        set({ selectedCenter: center }),
      setReservationColors: (reservationColors: ReservationColorResDto) =>
        set({ reservationColors }),
      setCurrentMonthReservations: (
        reservations: GroupedReservationMemberDto[]
      ) => set({ currentMonthreservations: reservations }),
    }),
    {
      name: storageKeys.user,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
