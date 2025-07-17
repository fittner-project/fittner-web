import { TermsListResDto } from "@/api/generated/models";
import { storageKeys } from "@/constants/storageKeys";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SelectedTermState {
  selectedTerm: TermsListResDto | null;
  setSelectedTerm: (selectedTerm: TermsListResDto | null) => void;
  selectedTermUrl: string | null;
  setSelectedTermUrl: (selectedTermUrl: string | null) => void;
  selectedTermDate: string | null;
  setSelectedTermDate: (selectedTermDate: string | null) => void;
}

const useSelectedTermStore = create(
  persist<SelectedTermState>(
    (set, _get) => ({
      selectedTerm: null,
      setSelectedTerm: (selectedTerm: TermsListResDto | null) =>
        set(() => ({ selectedTerm: selectedTerm })),
      selectedTermUrl: null,
      setSelectedTermUrl: (selectedTermUrl: string | null) =>
        set(() => ({ selectedTermUrl: selectedTermUrl })),
      selectedTermDate: null,
      setSelectedTermDate: (selectedTermDate: string | null) =>
        set(() => ({ selectedTermDate: selectedTermDate })),
    }),
    {
      name: storageKeys.selectedTerm,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useSelectedTermStore;
