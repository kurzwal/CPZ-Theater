import Phaser from "phaser";
import { createAnims } from "./CharacterMethods";

class Character extends Phaser.Physics.Arcade.Sprite {
   VELOCITY = 300;
   public lastDirection: "left" | "right" | "up" | "down" = "down";
   public isMoving: boolean = false;

   constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
      super(scene, x, y, texture);

      scene.add.existing(this);
      scene.physics.add.existing(this);
      
      createAnims(this, "walkDown", "Character", [0, 1, 2, 1]);
      createAnims(this, "walkLeft", "Character", [3, 4, 5, 4]);
      createAnims(this, "walkRight", "Character", [6, 7, 8, 7]);
      createAnims(this, "walkUp", "Character", [9, 10, 11, 10]);
   }
}

export default Character;
