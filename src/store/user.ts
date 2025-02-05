import { UserCenterListResDto, UserInfoResDto } from "@/api/generated/models";
import { create } from "zustand";

interface IUserDispatcher {
  setSelectedCenter: (center: UserCenterListResDto) => void;
  setUserInfo: (userInfo: UserInfoResDto) => void;
}

interface UserStore extends IUserDispatcher {
  userInfo: UserInfoResDto;
  selectedCenter: UserCenterListResDto;
}

export const useUserStore = create<UserStore>((set) => ({
  userInfo: {},
  selectedCenter: {},
  setUserInfo: (userInfo: UserInfoResDto) => set({ userInfo }),
  setSelectedCenter: (center: UserCenterListResDto) =>
    set({ selectedCenter: center }),
}));
