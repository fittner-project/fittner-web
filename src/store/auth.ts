import { storageKeys } from "@/constants/storageKeys";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ApprovalStatus =
  | "INITIAL"
  | "INACTIVE"
  | "ACTIVE"
  | "STOP"
  | "DROP";

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  refreshToken: string;
  setRefreshToken: (refreshToken: string) => void;
  logout: () => void;
}

// aceess token 24시간
// refresh token 1주

const useAuthStore = create<AuthState>()(
  persist(
    (set, _get) => ({
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),

      accessToken: "",
      setAccessToken: (accessToken: string) => set({ accessToken }),

      refreshToken: "",
      setRefreshToken: (refreshToken: string) => set({ refreshToken }),

      logout: () => {
        set({
          isAuthenticated: false,
          accessToken: "",
          refreshToken: "",
        });
      },
    }),
    {
      name: storageKeys.auth,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
