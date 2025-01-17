import { create } from "zustand";

interface BottomSheet {
  component: React.ComponentType<any>;
  props?: any;
}

interface BottomSheetStore {
  currentSheet: BottomSheet | null;
  isOpen: boolean;
  isLoading: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  openBottomSheet: <T>(
    component: React.ComponentType<T>,
    props?: Partial<T>
  ) => void;
  closeBottomSheet: () => void;
}

export const useBottomSheetStore = create<BottomSheetStore>((set) => ({
  currentSheet: null,
  isOpen: false,
  isLoading: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  setIsLoading: (isLoading) => set({ isLoading }),
  openBottomSheet: (component, props) =>
    set({ currentSheet: { component, props }, isOpen: true }),
  closeBottomSheet: () => set({ currentSheet: null }),
}));
