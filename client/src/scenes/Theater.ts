import Phaser from "phaser";

class Theater extends Phaser.Scene {
   constructor() {
      super("Theater");
   }

   preload() {}

   create() {
      this.add.text(300, 300, "Theater", { fontSize: "32px" }).setOrigin(0.5);
   }
}

export default Theater;
