import { UserCenterListResDto, UserInfoResDto } from "@/api/generated/models";
import { storageKeys } from "@/constants/storageKeys";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUserDispatcher {
  setSelectedCenter: (center: UserCenterListResDto) => void;
  setUserInfo: (userInfo: UserInfoResDto) => void;
}

interface UserStore extends IUserDispatcher {
  userInfo: UserInfoResDto;
  selectedCenter: UserCenterListResDto;
}

export const useUserStore = create(
  persist<UserStore>(
    (set, _get) => ({
      userInfo: {},
      selectedCenter: {},
      setUserInfo: (userInfo: UserInfoResDto) => set({ userInfo }),
      setSelectedCenter: (center: UserCenterListResDto) =>
        set({ selectedCenter: center }),
    }),
    {
      name: storageKeys.user,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
