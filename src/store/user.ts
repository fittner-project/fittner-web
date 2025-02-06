import { CenterInfo, DefaultInfo } from "@/api/generated/models";
import { storageKeys } from "@/constants/storageKeys";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUserDispatcher {
  setUserInfo: (userInfo: DefaultInfo) => void;
  setSelectedCenter: (center: CenterInfo) => void;
}

interface UserStore extends IUserDispatcher {
  userInfo: DefaultInfo;
  selectedCenter: CenterInfo;
}

export const useUserStore = create(
  persist<UserStore>(
    (set, _get) => ({
      userInfo: {},
      selectedCenter: {},
      setUserInfo: (userInfo: DefaultInfo) => set({ userInfo }),
      setSelectedCenter: (center: CenterInfo) =>
        set({ selectedCenter: center }),
    }),
    {
      name: storageKeys.user,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
