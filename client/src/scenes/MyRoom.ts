import Phaser from "phaser";
import MainCharacter from "../character/MainCharacter";

class MyRoom extends Phaser.Scene {
   constructor() {
      super("MyRoom");
   }
   private map!: Phaser.Tilemaps.Tilemap;
   private cursor!: Phaser.Types.Input.Keyboard.CursorKeys;
   private character!: MainCharacter;
   preload() {
      // 나중에 Tiled로 타일셋 압축하고 합칠 예정임 굿
      this.load.tilemapTiledJSON(
         "MyRoomMap",
         "assets/tilemap/MyRoom/MyRoom.json"
      );
      this.load.image(
         "DoorsAndWindowsTiles",
         "assets/tilemap/MyRoom/DoorsAndWindows.png"
      );
      this.load.image(
         "FloorsAndWallsTiles",
         "assets/tilemap/MyRoom/FloorsAndWalls.png"
      );
      this.load.image(
         "FurnitureState1Tiles",
         "assets/tilemap/MyRoom/FurnitureState1.png"
      );
      this.load.image("ItemsTiles", "assets/tilemap/MyRoom/Items.png");
      MainCharacter.preload(this);
   }

   create() {
      this.cursor = this.input.keyboard.createCursorKeys();

      this.map = this.make.tilemap({ key: "MyRoomMap" });
      const DoorsAndWindows = this.map.addTilesetImage(
         "DoorsAndWindowsTiles",
         "DoorsAndWindowsTiles"
      );
      const FloorsAndWalls = this.map.addTilesetImage(
         "FloorsAndWallsTiles",
         "FloorsAndWallsTiles"
      );
      const FurnitureState1 = this.map.addTilesetImage(
         "FurnitureState1Tiles",
         "FurnitureState1Tiles"
      );
      const Items = this.map.addTilesetImage("ItemsTiles", "ItemsTiles");
      const tiles = [DoorsAndWindows, FloorsAndWalls, FurnitureState1, Items];

      const groundLayer = this.map
         .createLayer("FloorAndGround", tiles, 0, 0)
         .setScale(3);
      this.character = new MainCharacter(this, 550, 500);
      const objectsLayer = this.map
         .createLayer("Objects", tiles, 0, 0)
         .setScale(3);
      const itemsLayer = this.map.createLayer("Items", tiles, 0, 0).setScale(3);
      groundLayer.setCollisionByProperty({ collides: true });
      objectsLayer.setCollisionByProperty({ collides: true });
      itemsLayer.setCollisionByProperty({ collides: true });

      this.physics.add.collider(this.character, [
         groundLayer,
         objectsLayer,
         itemsLayer,
      ]);

      this.scene.launch("GlobalMenuIcon");
   }

   update() {
      this.character.update(this.cursor);
   }
}

export default MyRoom;
