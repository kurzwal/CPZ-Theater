import Phaser from "phaser";
import Character from "./Character";

class MainCharacter extends Character {
   constructor(scene: Phaser.Scene, x: number, y: number) {
      super(scene, x, y, "MainCharacter");

      this.setScale(3);
      this.setSize(15, 10); // 물리 충돌 크기 설정
      this.setOffset(0, 10); // 물리 충돌 위치 설정

      this.createAnims("walkDown", "Character", [0, 1, 2, 1]);
      this.createAnims("walkLeft", "Character", [3, 4, 5, 4]);
      this.createAnims("walkRight", "Character", [6, 7, 8, 7]);
      this.createAnims("walkUp", "Character", [9, 10, 11, 10]);
   }

   static preload(scene: Phaser.Scene) {
      scene.load.spritesheet("Character", "assets/character/character.png", {
         frameWidth: 15,
         frameHeight: 18,
         startFrame: 0,
         endFrame: 11,
      });
   }

   update(cursor: Phaser.Types.Input.Keyboard.CursorKeys) {
      if (!this.body.velocity) return;
      if (cursor.right.isDown) {
         this.body.velocity.x = this.VELOCITY;
         this.isMoving = true;
         this.play("walkRight", true);
         this.lastDirection = "right";
      }
      if (cursor.left.isDown) {
         this.body.velocity.x = -this.VELOCITY;
         this.isMoving = true;
         this.play("walkLeft", true);
         this.lastDirection = "left";
      }
      if (cursor.down.isDown) {
         this.body.velocity.y = this.VELOCITY;
         this.isMoving = true;
         this.play("walkDown", true);
         this.lastDirection = "down";
      }
      if (cursor.up.isDown) {
         this.body.velocity.y = -this.VELOCITY;
         this.isMoving = true;
         this.play("walkUp", true);
         this.lastDirection = "up";
      }
      if (cursor.right.isUp && cursor.left.isUp) {
         this.body.velocity.x = 0;
      }
      if (cursor.down.isUp && cursor.up.isUp) {
         this.body.velocity.y = 0;
      }
      if (
         cursor.right.isUp &&
         cursor.left.isUp &&
         cursor.down.isUp &&
         cursor.up.isUp
      ) {
         this.anims.stop();
         this.setCharacterIdleFrame();
         this.isMoving = false;
      }
   }

   /**
    * Creates and adds an animation to the character.
    * @param animsKey - 애니메이션의 key를 정의해주세요.
    * @param spritesKey - 기존에 불러온 sprite의 키를 넣어주세요.
    * @param frames - 몇 번 프레임을 사용할 지 배열로 넣어주세요.
    * @param animsDuration - 애니메이션의 속도를 ms단위로 받습니다. 기본값은 100 입니다.
    * @param repeat - 몇 번 반복할 지 넣어주세요. 기본값은 -1 (무한루프) 입니다.
    */
   createAnims(
      animsKey: string,
      spritesKey: string,
      frames: number[],
      animsDuration?: number,
      repeat?: number
   ) {
      const animationFrames: Phaser.Types.Animations.AnimationFrame[] = [];
      frames.forEach((frame) => {
         animationFrames.push({
            key: spritesKey,
            frame: frame,
            duration: animsDuration || 100,
         });
      });
      this.anims.create({
         key: animsKey,
         frames: animationFrames,
         repeat: repeat || -1,
      });
   }

   setCharacterIdleFrame() {
      switch (this.lastDirection) {
         case "down":
            this.setTexture("Character", 1); // down idle frame
            break;
         case "left":
            this.setTexture("Character", 4); // left idle frame
            break;
         case "right":
            this.setTexture("Character", 7); // right idle frame
            break;
         case "up":
            this.setTexture("Character", 10); // up idle frame
            break;
      }
   }
}

export default MainCharacter;
