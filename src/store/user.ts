import { CenterListResDto, UserInfoResDto } from "@/api/generated/models";
import { storageKeys } from "@/constants/storageKeys";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUserDispatcher {
  setUserInfo: (userInfo: UserInfoResDto) => void;
  setSelectedCenter: (center: CenterListResDto) => void;
}

interface UserStore extends IUserDispatcher {
  userInfo: UserInfoResDto;
  selectedCenter: CenterListResDto;
}

export const useUserStore = create(
  persist<UserStore>(
    (set, _get) => ({
      userInfo: {},
      selectedCenter: {},
      setUserInfo: (userInfo: UserInfoResDto) => set({ userInfo }),
      setSelectedCenter: (center: CenterListResDto) =>
        set({ selectedCenter: center }),
    }),
    {
      name: storageKeys.user,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
