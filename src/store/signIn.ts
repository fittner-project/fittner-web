import { storageKeys } from "@/constants/storageKeys";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SignInState {
  isSignedIn: boolean;
  setIsSignedIn: (isSignedIn: boolean) => void;
}

const useSignInStore = create<SignInState>()(
  persist(
    (set, _get) => ({
      isSignedIn: false,
      setIsSignedIn: (isSignedIn: boolean) => set({ isSignedIn }),
    }),
    {
      name: storageKeys.signIn,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSignInStore;
