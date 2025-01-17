import { create } from "zustand";

export interface ModalState {
  isOpen: boolean;
  component: React.ComponentType<any>;
  props: any;
}

interface ModalStore {
  modals: ModalState[];
  openModal: (component: React.ComponentType<any>, props?: any) => void;
  closeModal: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modals: [],
  isLoading: false,
  openModal: (component, props = {}) =>
    set((state) => ({
      modals: [...state.modals, { isOpen: true, component, props }],
    })),
  closeModal: () =>
    set((state) => ({
      modals: state.modals.slice(0, -1),
    })),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
