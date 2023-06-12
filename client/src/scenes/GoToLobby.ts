import Phaser from "phaser";

class GoToLobby extends Phaser.Scene {
   constructor() {
      super("GoToLobby");
   }

   preload() {}

   create() {
      // 다른 씬의 입력 차단
      this.input.stopPropagation();

      const rect = this.add
         .rectangle(300, 300, 200, 200, 0x9999ff)
         .setOrigin(0.5);
      this.add.text(300, 300, "Enter", { color: "#000000" }).setOrigin(0.5);

      this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
         if (!rect.getBounds().contains(pointer.x, pointer.y)) {
            this.scene.stop();
         } else {
            this.scene.stop();
            this.scene.stop("MyRoom");
            this.scene.stop("Theater");
            this.scene.start("Lobby");
         }
      });
   }
}

export default GoToLobby;
