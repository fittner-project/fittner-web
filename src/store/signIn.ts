import { create } from "zustand";

interface SignInStore {}
export const useSignInStore = create<SignInStore>((set) => ({}));
