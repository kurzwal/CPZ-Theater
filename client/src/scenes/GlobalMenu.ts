import Phaser from "phaser";
import Network from "../services/Network";

class GlobalMenu extends Phaser.Scene {
   constructor() {
      super("GlobalMenu");
   }
   private network = Network.getInstance();

   preload() {
      this.load.image("MenuFrame", "assets/tilemap/Menu/Menu_Frame.png");
      this.load.image("MenuItem", "assets/tilemap/Menu/House_Black.png");
   }

   create() {
      this.input.stopPropagation();

      const menuFrame = this.add
         .image(window.innerWidth / 2, window.innerHeight / 2, "MenuFrame")
         .setOrigin(0.5)
         .setScale(2)
         .setInteractive();

      const menuItem1 = this.add
         .image(window.innerWidth / 2 - 200, window.innerHeight / 2, "MenuItem")
         .setOrigin(0.5)
         .setInteractive();
      const menuItem2 = this.add
         .image(window.innerWidth / 2, window.innerHeight / 2, "MenuItem")
         .setOrigin(0.5)
         .setInteractive();
      const menuItem3 = this.add
         .image(window.innerWidth / 2 + 200, window.innerHeight / 2, "MenuItem")
         .setOrigin(0.5)
         .setInteractive();

      this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
         if (!menuFrame.getBounds().contains(pointer.x, pointer.y)) {
            this.scene.stop();
         } else if (menuItem1.getBounds().contains(pointer.x, pointer.y)) {
            this.network.leaveRoom();
            this.scene.stop("Theater");
            this.scene.stop("Lobby");
            this.scene.stop();
            this.scene.start("MyRoom");
         } else if (menuItem2.getBounds().contains(pointer.x, pointer.y)) {
            this.network.leaveRoom();
            this.scene.stop("MyRoom");
            this.scene.stop("Lobby");
            this.scene.stop();
            this.scene.start("Theater");
         } else if (menuItem3.getBounds().contains(pointer.x, pointer.y)) {
            this.network.leaveRoom();
            this.scene.stop("Theater");
            this.scene.stop("MyRoom");
            this.scene.stop();
            this.scene.start("Lobby");
         }
      });
   }
}

export default GlobalMenu;
