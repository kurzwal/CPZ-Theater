import Phaser from "phaser";

// class ChatBubble extends Phaser.GameObjects.Container {
//    public elapseTime: number = 3000;
//    constructor(scene: Phaser.Scene, x: number, y: number, text: string) {
//       // Create background and text elements
//       const background = scene.add.rectangle(0, 0, 0, 0, 0xffffff);
//       const messageText = scene.add.text(0, 0, text, {
//          fontFamily: "Arial",
//          fontSize: "16px",
//          color: "#000000",
//       });

//       // Call parent constructor with scene and array of elements
//       super(scene, x, y, [background, messageText]);

//       // Resize background to fit text
//       background.width = messageText.width + 10;
//       background.height = messageText.height + 5;

//       // Set the origin of the container to its center
//       background.setOrigin(0.5, 0.5);
//       messageText.setOrigin(0.5, 0.5);

//       // Add the container to the scene
//       scene.add.existing(this);
//    }
//    update(delta: number) {
//       this.elapseTime -= delta;
//       this.checkAndDestroy();
//    }

//    private checkAndDestroy() {
//       if (this.elapseTime <= 0) {
//          this.destroy();
//       }
//    }

//    reset() {
//       this.elapseTime = 3000;

//    }
// }

// export default ChatBubble;
