import { Client, Room } from "colyseus";
import { Player, State } from "../types/schema";
import { Youtube } from "../types/schema";

export class TheaterRoom extends Room<State> {
   maxClients = 50;

   onCreate(options) {
      // console.log("TheaterRoom created!", options);

      this.setState(new State());

      this.onMessage("move", (client, data: Player) => {
         this.state.movePlayer(client.sessionId, data);
      });

      this.onMessage("chat", (client, message: string) => {
         const chatMessage = `(${client.sessionId}) ${message}`;
         this.broadcast("chat", chatMessage);
         // DB에 client.sessionId + message + new Date() 저장
      });

      this.onMessage("youtube", (client, youtubeLink: string) => {
         const youtube = new Youtube(client.sessionId, youtubeLink);
         this.broadcast("youtube", youtube);
      });
   }

   onJoin(client: Client) {
      this.broadcast("messages", `${client.sessionId} joined.`);
      // DB에 client.sessionId + message + new Date() 저장
   }

   onLeave(client: Client) {
      this.broadcast("messages", `${client.sessionId} left.`);
      // DB에 client.sessionId + message + new Date() 저장
   }

   onDispose() {}
}
