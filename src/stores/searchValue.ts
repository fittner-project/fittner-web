import { create } from "zustand";

interface SearchStore {
  searchValue: string;
  setSearchValue: (value: string) => void;
  reset: () => void;
}

export const useSearchValueStore = create<SearchStore>((set) => ({
  searchValue: "",
  setSearchValue: (value) => set({ searchValue: value }),
  reset: () => set({ searchValue: "" }),
}));
