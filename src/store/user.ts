import {
  BrandColorResDto,
  CenterInfo,
  DefaultInfo,
  ReservationColorResDto,
} from "@/api/generated/models";
import { storageKeys } from "@/constants/storageKeys";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUserDispatcher {
  setUserInfo: (userInfo: DefaultInfo) => void;
  setSelectedCenter: (center: CenterInfo) => void;
  setReservationColors: (reservationColors: ReservationColorResDto) => void;
  setBrandColors: (brandColors: BrandColorResDto) => void;
}

interface UserStore extends IUserDispatcher {
  userInfo: DefaultInfo;
  selectedCenter: CenterInfo;
  reservationColors: ReservationColorResDto;
  brandColors: BrandColorResDto;
}

export const useUserStore = create(
  persist<UserStore>(
    (set, _get) => ({
      userInfo: {},
      selectedCenter: {},
      reservationColors: {},
      brandColors: {},
      setUserInfo: (userInfo: DefaultInfo) => set({ userInfo }),
      setSelectedCenter: (center: CenterInfo) =>
        set({ selectedCenter: center }),
      setReservationColors: (reservationColors: ReservationColorResDto) =>
        set({ reservationColors }),
      setBrandColors: (brandColors: BrandColorResDto) => set({ brandColors }),
    }),
    {
      name: storageKeys.user,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
