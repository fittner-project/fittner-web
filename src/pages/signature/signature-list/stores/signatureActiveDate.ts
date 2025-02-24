import { storageKeys } from "@/constants/storageKeys";
import dayjs from "dayjs";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SignatureActiveDateStore {
  activeDate: string;
  setActiveDate: (activeDate: string) => void;
}

export const useSignatureActiveDateStore = create<SignatureActiveDateStore>()(
  persist(
    (set, _get) => ({
      activeDate: dayjs().format("YYYYMMDD"),
      setActiveDate: (activeDate: string) => set({ activeDate: activeDate }),
    }),
    {
      name: storageKeys.signatureActiveDate,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
