import { storageKeys } from "@/constants/storageKeys";
import dayjs from "dayjs";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface RevenueActiveDateStore {
  activeDate: string;
  setActiveDate: (activeDate: string) => void;
}

export const useRevenueActiveDateStore = create<RevenueActiveDateStore>()(
  persist(
    (set, _get) => ({
      activeDate: dayjs().format("YYYYMM"),
      setActiveDate: (activeDate: string) => set({ activeDate: activeDate }),
    }),
    {
      name: storageKeys.revenueActiveDate,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
