import { storageKeys } from "@/constants/storageKeys";
import { storage } from "@/utils/storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ApprovalStatus = "initial" | "pending" | "approved" | "rejected";

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  signUpApprovalStatus: ApprovalStatus;
  setSignUpApprovalStatus: (signUpApprovalStatus: ApprovalStatus) => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  refreshToken: string;
  setRefreshToken: (refreshToken: string) => void;
  clearTokens: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, _get) => ({
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),
      signUpApprovalStatus: "initial",
      setSignUpApprovalStatus: (signUpApprovalStatus: ApprovalStatus) =>
        set({ signUpApprovalStatus }),
      accessToken: "",
      setAccessToken: (accessToken: string) => set({ accessToken }),
      refreshToken: "",
      setRefreshToken: (refreshToken: string) => set({ refreshToken }),
      clearTokens: () => {
        set({ accessToken: "", refreshToken: "" });
      },
    }),
    {
      name: storageKeys.auth,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
