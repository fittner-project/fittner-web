import { create } from "zustand";

interface AppStore {
  injectedBackFunction: (() => void) | null;
  setInjectedBackFunction: (fn: (() => void) | null) => void;
}

const useAppStore = create<AppStore>((set) => ({
  injectedBackFunction: null,
  setInjectedBackFunction: (fn) => set({ injectedBackFunction: fn }),
}));

export default useAppStore;
