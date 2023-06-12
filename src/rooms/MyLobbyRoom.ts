import { Room, Client } from "colyseus";
import { Player, State } from "../types/schema";
import { Db } from "mongodb";
import { getDbInstance } from "../db";
import { insertChat } from "../dbMethods";

// Lobby에서 사용할 방 (나중에 여러개 생성할 수 있게 바꾸어야함)
export class MyLobbyRoom extends Room<State> {
   private db: Db = getDbInstance();
   private stateMoved: boolean = false;
   maxClients = 50;

   onCreate(options) {
      this.setState(new State());

      // 캐릭터가 움직일 때 state에 저장 (db 저장 안함)
      this.onMessage("move", (client: Client, data: Player) => {
         this.state.movePlayer(client.id, data);
         this.stateMoved = true;
      });
      // 0.1초마다 캐릭터들의 모든 움직임 broadcast
      setInterval(() => {
         if (this.stateMoved) {
            this.broadcast("move", this.state.players);
            this.stateMoved = false;
         }
      }, 100);

      // 채팅 broadcast (db에 저장)
      this.onMessage("chat", (client: Client, message: string) => {
         const userNickname = client.userData?.nickname || "someone";
         const chatMessage = { id: userNickname, message: message };
         this.broadcast("chat", chatMessage);
         insertChat(this.db, chatMessage);
      });
   }

   onJoin(client: Client) {
      const userNickname = client.userData?.nickname || "someone";
      this.broadcast("chat", `${userNickname} joined.`);
      this.state.createPlayer(client.id, userNickname);
   }

   onLeave(client: Client) {
      const userNickname = client.userData?.nickname || "someone";
      this.broadcast("chat", `${userNickname} left.`);
      this.state.removePlayer(client.id);
      this.stateMoved = true;
      // DB에 client.sessionId + message + new Date() 저장
   }

   onDispose() {}
}
