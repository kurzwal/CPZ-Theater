import Phaser from "phaser";
import useStore from "../stores/phaserConfigStore";

class Background extends Phaser.Scene {
   constructor() {
      super("Background");
   }

   private backgroundImage?: Phaser.GameObjects.Image;

   preload() {
      this.load.image("background1", "assets/background/background1.png");
      this.load.image("background2", "assets/background/background2.png");
   }

   create() {
      const { width, height } = useStore.getState();

      this.backgroundImage = this.add
         .image(0, 0, "background1")
         .setOrigin(0, 0);

      const scaleImage = (image: Phaser.GameObjects.Image) => {
         const originalWidth = image.width;
         const originalHeight = image.height;
         image.setScale(width / originalWidth, height / originalHeight);
      };

      scaleImage(this.backgroundImage);

      this.add
         .rectangle(100, 800, 100, 100, 0xaa3333)
         .setInteractive()
         .on("pointerdown", () => {
            if (!this.backgroundImage) return;
            if (this.backgroundImage.texture.key === "background1") {
               this.backgroundImage.setTexture("background2");
            } else {
               this.backgroundImage.setTexture("background1");
            }
            scaleImage(this.backgroundImage);
         });

      this.scene.launch("Opening");
   }

   update(time: number, delta: number): void {
   }
}

export default Background;
