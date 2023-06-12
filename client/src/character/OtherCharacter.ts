import Phaser from "phaser";

const VELOCITY = 300;

class OtherCharacter extends Phaser.Physics.Arcade.Sprite {
   public lastDirection: "left" | "right" | "up" | "down" = "down";
   public isMoving: boolean = false;
   private nickname: string = "";

   constructor(scene: Phaser.Scene, nickname: string, x: number, y: number) {
      super(scene, x, y, "OtherCharacter");

      scene.add.existing(this);
      scene.physics.add.existing(this);

      this.setScale(3);

      this.createAnims("walkDown", "Character", [0, 1, 2, 1]);
      this.createAnims("walkLeft", "Character", [3, 4, 5, 4]);
      this.createAnims("walkRight", "Character", [6, 7, 8, 7]);
      this.createAnims("walkUp", "Character", [9, 10, 11, 10]);
   }

   /** Async initialize */
   static async create(
      scene: Phaser.Scene,
      nickname: string,
      x: number,
      y: number
   ): Promise<OtherCharacter> {
      const character = new OtherCharacter(scene, nickname, x, y);
      return character;
   }

   update(movedX: number, movedY: number, isMoving: boolean) {
      const { deltaX, deltaY } = this.getSign(movedX, movedY);
      this.moveCharacter(deltaX, deltaY);
      this.updateAnimation(deltaX, deltaY, isMoving);
   }

   private moveCharacter(deltaX: number, deltaY: number) {
      if (!this.body?.velocity) {
      } else if (deltaX === 0 && deltaY === 0) {
         this.body.velocity.x = 0;
         this.body.velocity.y = 0;
      } else if (deltaX === 0) {
         this.body.velocity.x = 0;
         this.body.velocity.y = deltaY * VELOCITY;
      } else if (deltaY === 0) {
         this.body.velocity.x = deltaX * VELOCITY;
         this.body.velocity.y = 0;
      } else {
         this.body.velocity.x = deltaX * VELOCITY;
         this.body.velocity.y = deltaY * VELOCITY;
      }
   }

   private updateAnimation(deltaX: number, deltaY: number, isMoving: boolean) {
      const walking = !isMoving
         ? null
         : deltaX > 0
         ? "right"
         : deltaX < 0
         ? "left"
         : deltaY > 0
         ? "down"
         : deltaY < 0
         ? "up"
         : this.lastDirection;
      const animations = {
         right: "walkRight",
         left: "walkLeft",
         down: "walkDown",
         up: "walkUp",
      };

      if (walking) {
         this.play(animations[walking], true);
         this.lastDirection = walking;
      } else {
         this.setCharacterIdleFrame();
      }
   }

   destroyCharacter() {
      this.destroy();
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
      if (!this.anims?.stop) return;
      this.anims.stop()
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

   getSign(movedX: number, movedY: number) {
      const retX =
         Math.abs(movedX - this.x) <= 5 ? 0 : Math.sign(movedX - this.x);
      const retY =
         Math.abs(movedY - this.y) <= 5 ? 0 : Math.sign(movedY - this.y);
      return { deltaX: retX, deltaY: retY };
   }
}

export default OtherCharacter;
