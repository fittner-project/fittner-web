import { storageKeys } from "@/constants/storageKeys";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ApprovalStatus = "INITIAL" | "INACTIVE" | "ACTIVE" | "STOP" | "DROP";

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

// aceess token 24시간
// refresh token 1주

const useAuthStore = create<AuthState>()(
  persist(
    (set, _get) => ({
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),
      signUpApprovalStatus: "INITIAL",
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
