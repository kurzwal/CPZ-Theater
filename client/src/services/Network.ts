import { Client, Room } from "colyseus.js";

import { useChatStore } from "../stores/chattingMessageStore";
import { useServiceStore } from "../stores/pahserServiceStore";
import { usePlayerStore } from "../stores/phaserCharacterStateStore";

import { LobbyPlayer, LobbyState, Chat } from "../types/networkDtoTypes";

export default class Network {
   private static instance: Network;
   private client: Client;
   private room!: Room;
   private isConnected: boolean;

   private constructor() {
      const protocol = "ws://localhost:2567";
      this.client = new Client(protocol);
      this.isConnected = false;
   }

   static getInstance(): Network {
      if (!Network.instance) {
         Network.instance = new Network();
      }
      return Network.instance;
   }

   async joinRoom(roomName: string) {
      this.room = await this.client.joinOrCreate(roomName);
      this.isConnected = true;
   }

   send(msType: string, sendData: any) {
      this.room.send(msType, sendData);
   }

   leaveRoom() {
      if (this.room && this.isConnected) {
         this.room.leave();
         this.isConnected = false;
      }
   }

   createWebSocketMessageMethods(
      scene: Phaser.Scene,
      moveCallback?: Function,
      chatCallback?: Function
   ) {
      if (moveCallback) {
         this.room.onMessage("move", (resState: any) => {
            const currentId = this.room.sessionId;
            const state = this.convertToLobbyState(resState);
            if (state) {
               state.players.delete(currentId);
               moveCallback(state);
            }
         });
      }
      if (chatCallback) {
         this.room.onMessage("chat", (message: Chat) => {
            // const handleChatStore = scene.registry.get("handleChatStore")();
            // handleChatStore(message);
            chatCallback(message);
         });
      }
   }
   convertToLobbyState(stateObj: any): LobbyState | null {
      if (!stateObj || typeof stateObj !== "object") {
         return null;
      }

      const players = new Map<string, LobbyPlayer>();

      for (const key in stateObj) {
         if (
            stateObj.hasOwnProperty(key) &&
            typeof stateObj[key] === "object" &&
            stateObj[key] !== null
         ) {
            const playerObj = stateObj[key];
            if (
               typeof playerObj.nickname === "string" &&
               typeof playerObj.x === "number" &&
               typeof playerObj.y === "number" &&
               typeof playerObj.isMoving === "boolean"
            ) {
               players.set(key, {
                  nickname: playerObj.nickname,
                  x: playerObj.x,
                  y: playerObj.y,
                  isMoving: playerObj.isMoving,
               });
            } else {
               return null;
            }
         } else {
            return null;
         }
      }

      return { players };
   }
}
