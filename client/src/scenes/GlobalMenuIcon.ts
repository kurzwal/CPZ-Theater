import Phaser from "phaser";

class GlobalMenuIcon extends Phaser.Scene {
   constructor() {
      super("GlobalMenuIcon");
   }

   preload() {
      this.load.image("MenuIcon", "assets/icon/Menu_Icon.png");
   }

   create() {
      const menuIcon = this.add
         .image(300, 300, "MenuIcon")
         .setOrigin(0.5)
         .setInteractive()
         .setScale(0.5);

      menuIcon.on("pointerdown", () => {
         this.scene.launch("GlobalMenu");
      });
   }
}

export default GlobalMenuIcon;
