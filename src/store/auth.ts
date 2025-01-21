import { storageKeys } from "@/constants/storageKeys";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, _get) => ({
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),
    }),
    {
      name: storageKeys.auth,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
