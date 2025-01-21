import { storageKeys } from "@/constants/storageKeys";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ApprovalStatus = "initial" | "pending" | "approved" | "rejected";

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  signUpApprovalStatus: ApprovalStatus;
  setSignUpApprovalStatus: (signUpApprovalStatus: ApprovalStatus) => void;
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
    }),
    {
      name: storageKeys.auth,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
