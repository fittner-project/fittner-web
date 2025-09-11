import { storageKeys } from "@/constants/storageKeys";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface FcmTokenStore {
  fcmToken: string;
  setFcmToken: (fcmToken: string) => void;
}

export const useFcmTokenStore = create(
  persist<FcmTokenStore>(
    (set, _get) => ({
      fcmToken: "",
      setFcmToken: (fcmToken: string) => set(() => ({ fcmToken })),
    }),
    {
      name: storageKeys.fcmToken,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
