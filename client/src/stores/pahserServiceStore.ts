import { create } from "zustand";

interface ServiceStore {
   onChat: boolean;
   focusChat: boolean;
   onYtRes: boolean;
   focusYtRes: boolean;

   setOnChatComp: () => void;
   setOffChatComp: () => void;
   setOnChatFocus: () => void;
   setOffChatFocus: () => void;
   toggleOnYtRes: () => void;
   toggleFocusYtRes: () => void;
}

export const useServiceStore = create<ServiceStore>((set, get) => ({
   onChat: false,
   focusChat: false,
   onYtRes: false,
   focusYtRes: false,

   setOnChatComp: () => set((state) => ({ ...state, onChat: true })),
   setOffChatComp: () => set((state) => ({ ...state, onChat: false })),
   setOnChatFocus: () => set((state) => ({ ...state, focusChat: true })),
   setOffChatFocus: () => set((state) => ({ ...state, focusChat: false })),

   toggleOnYtRes: () => set((state) => ({ ...state, onYtRes: !state.onYtRes })),
   toggleFocusYtRes: () =>
      set((state) => ({ ...state, focusYtRes: !state.focusYtRes })),
}));
