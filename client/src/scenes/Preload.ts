import Phaser from "phaser";
import Network from "../services/Network";

class Preload extends Phaser.Scene {

   private preloadComplete: boolean = false;

   public network!: Network;
   constructor() {
      super("Preload");
   }

   preload() {
      // preload 끝나면 변수 핸들링
      this.load.on("complete", () => {
         this.preloadComplete = true;
      });
   }

   create() {
      this.scene.start("MyRoom");
      this.scene.stop();
   }
}

export default Preload;
