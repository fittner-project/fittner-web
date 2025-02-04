import { UserInfoResDto } from "@/api/generated/models";
import { create } from "zustand";

interface UserStore {
  userInfo: UserInfoResDto;
}
export const useUserStore = create<UserStore>((set) => ({
  userInfo: {},
  setUserInfo: (userInfo: UserInfoResDto) => set({ userInfo }),
}));
