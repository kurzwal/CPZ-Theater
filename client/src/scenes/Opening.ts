import Phaser from "phaser";

class Opening extends Phaser.Scene {
   private skip: boolean = false;
   constructor() {
      super("Opening");
   }

   preload() {}
   create() {
      const timeText = this.add
         .text(300, 300, "3", { fontSize: "16px" })
         .setOrigin(0.5);
      let time = 3;
      this.add
         .text(300, 200, "Title Text", { fontSize: "30px", fixedHeight: 50 })
         .setOrigin(0.5);
      this.input.on("pointerdown", () => {
         if (this.skip) {
            this.scene.start("Preload");
            this.scene.stop();
         } else {
            this.skip = true;
            this.add
               .text(300, 400, "Skipped", { fontSize: "30px" })
               .setOrigin(0.5);
         }
      });
      this.time.addEvent({
         delay: 1000,
         callback: () => {
            if (time > 0 && !this.skip) {
               time -= 1;
               timeText.setText(time.toString());
            } else if (time === 0 && !this.skip) {
               this.skip = true;
            }
         },
         callbackScope: this,
         loop: true,
      });
   }
}

export default Opening;
