import { storageKeys } from "@/constants/storageKeys";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface TicketActiveFilterStore {
  activeFilter: string;
  setActiveFilter: (activeFilter: string) => void;
}

export const useTicketActiveFilterStore = create<TicketActiveFilterStore>()(
  persist(
    (set, _get) => ({
      activeFilter: "전체",
      setActiveFilter: (activeFilter: string) => set({ activeFilter }),
    }),
    {
      name: storageKeys.ticketActiveFilter,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
