import { create } from "zustand";

interface ImageViewerStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
}

export const useImageViewerStore = create<ImageViewerStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  imageUrl: "",
  setImageUrl: (imageUrl: string) => set({ imageUrl }),
}));
