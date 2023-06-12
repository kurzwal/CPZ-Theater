import { Schema, type, MapSchema } from "@colyseus/schema";
import { extractYoutubeVideoId } from "../services/methods";

export class Player extends Schema {
   @type("string")
   nickname = "";

   @type("number")
   x = 550;

   @type("number")
   y = 500;

   @type("boolean")
   isMoving = false;

   move(movement: Player) {
      this.x = movement.x;
      this.y = movement.y;
      this.isMoving = movement.isMoving;
   }

   constructor(nickname: string) {
      super();
      this.nickname = nickname;
      this.x = 550;
      this.y = 500;
      this.isMoving = false;
   }
}

export class State extends Schema {
   @type({ map: Player })
   players = new MapSchema<Player>();

   createPlayer(id: string, nickname: string) {
      this.players.set(id, new Player(nickname));
   }

   removePlayer(id: string) {
      this.players.delete(id);
   }

   movePlayer(id: string, movement: Player) {
      this.players.get(id).move(movement);
   }
}

export class Youtube extends Schema {
   @type("string")
   clientId = "";

   @type("string")
   videoId = "";

   @type("number")
   startTime = 0;

   @type("number")
   date = new Date().getTime();

   constructor(clientId: string, link: string) {
      super(); // 추가
      this.clientId = clientId;
      const linkData = extractYoutubeVideoId(link);
      this.videoId = linkData.videoId;
      this.startTime = linkData.startTime;
      this.date = new Date().getTime();
   }
}

export class ChatMessage extends Schema {
   @type("string")
   clientId = "";

   @type("string")
   message = "";

   @type("number")
   date = 0;

   constructor(clientId: string, message: string) {
      super();
      this.clientId = clientId;
      this.message = message;
      this.date = Date.now();
   }
}
