import { create } from "zustand";
import { Chat } from "../types/networkDtoTypes";

export interface ChatStore {
   messages: Chat[];

   pushMessage: (message: Chat) => void;
   removeAll: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
   messages: [],

   pushMessage: (message: Chat) =>
      set((state) => ({
         messages: [...state.messages, message],
      })),

   removeAll: () => {
      set({ messages: [] });
   },
}));
