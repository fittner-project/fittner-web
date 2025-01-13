import { create } from "zustand";

interface ColorStore {}
export const useColorStore = create<ColorStore>((set) => ({}));
