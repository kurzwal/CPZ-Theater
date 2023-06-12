import Phaser from "phaser";

class GoToTheater extends Phaser.Scene {
   constructor() {
      super("GoToTheater");
   }

   preload() {}

   create() {
      this.input.stopPropagation();
      const rect = this.add
         .rectangle(300, 300, 200, 200, 0xff9999)
         .setOrigin(0.5);
      this.add.text(300, 300, "Enter", { color: "#000000" }).setOrigin(0.5);

      this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
         if (!rect.getBounds().contains(pointer.x, pointer.y)) {
            this.scene.stop();
         } else {
            this.scene.stop();
            this.scene.stop("MyRoom");
            this.scene.stop("Lobby");
            this.scene.start("Theater");
         }
      });
   }
}

export default GoToTheater;
