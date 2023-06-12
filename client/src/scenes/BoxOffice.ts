import Phaser from "phaser";

class BoxOffice extends Phaser.Scene {
   constructor() {
      super("BoxOffice");
   }

   preload() {}

   create() {
      this.add.text(300, 300, "BoxOffice", { fontSize: "32px" }).setOrigin(0.5);
   }
}

export default BoxOffice;
