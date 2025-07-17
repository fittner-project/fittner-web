import { storageKeys } from "@/constants/storageKeys";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface MyLessonsActiveFilterStore {
  activeFilter: "today" | "weekly";
  setActiveFilter: (activeFilter: "today" | "weekly") => void;
}

const useMyLessonsActiveFilterStore = create(
  persist<MyLessonsActiveFilterStore>(
    (set, _get) => ({
      activeFilter: "today",
      setActiveFilter: (activeFilter) => set({ activeFilter }),
    }),
    {
      name: storageKeys.myLessonsActiveFilter,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useMyLessonsActiveFilterStore;
