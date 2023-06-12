import { create } from "zustand";
import {
   LobbyPlayer,
   // , TheaterPlayer
} from "../types/networkDtoTypes";

// type Player = LobbyPlayer | TheaterPlayer;
type Player = LobbyPlayer;

export interface PlayerStore {
   players: Map<string, Player>;
   setPlayer: (id: string, player: Player) => void;
   setPlayers: (players: Map<string, Player>) => void;
   removePlayer: (id: string) => void;
   removeAll: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
   players: new Map(),

   setPlayer: (id, player) => {
      const players = get().players;
      players.set(id, player);
      set({ players });
   },

   setPlayers: (newPlayers) => {
      set({ players: newPlayers });
   },

   removePlayer: (id) => {
      const players = get().players;
      players.delete(id);
      set({ players });
   },

   removeAll: () => {
      set({ players: new Map() });
   },
}));
