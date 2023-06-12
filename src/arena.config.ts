import Arena from "@colyseus/arena";

import { MyLobbyRoom } from "./rooms/MyLobbyRoom";
import { TheaterRoom } from "./rooms/TheaterRoom";
import { setupExpress } from "./setupExpress";

export default Arena({
   getId: () => "Your Colyseus App",

   initializeGameServer: (gameServer) => {
      gameServer.define("MyLobbyRoom", MyLobbyRoom);
      gameServer.define("TheaterRoom", TheaterRoom);

      gameServer.onShutdown(function () {
         console.log(`game server is going down.`);
         console.log(new Date());
      });
   },

   initializeExpress: setupExpress,

   beforeListen: () => {},
});
