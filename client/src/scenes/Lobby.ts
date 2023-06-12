import Phaser, { GameObjects } from "phaser";

import MainCharacter from "../character/MainCharacter";
import OtherCharacter from "../character/OtherCharacter";
import Network from "../services/Network";
import { Chat, LobbyPlayer, LobbyState } from "../types/networkDtoTypes";
// import { verifyJWT } from "../services/verifyJWT";

const DEPTH = {
   Floor: 0,
   ObjectUnderCharacter: 1,
   OtherCharacter: 2,
   MainCharacter: 3,
   ObjectOverCharacter: 4,
};

class Lobby extends Phaser.Scene {
   constructor() {
      super("Lobby");
   }

   private network!: Network;
   private myInfo: any;
   private elapsedTime: number = 0;
   private map!: Phaser.Tilemaps.Tilemap;
   private cursor!: Phaser.Types.Input.Keyboard.CursorKeys;
   private keyEnter!: Phaser.Input.Keyboard.Key;
   private character!: MainCharacter;
   private lastPosition!: LobbyPlayer;
   private otherCharacters: Map<string, OtherCharacter> = new Map();
   private createCharacterBuffer: Map<string, LobbyPlayer> = new Map();
   private lastState: Map<string, LobbyPlayer> = new Map();
   private lastChat: Chat[] = [];

   init() {
      this.events.on("shutdown", this.destroyCharacters, this);
   }

   preload() {
      this.load.tilemapTiledJSON("LobbyMap", "assets/tilemap/Lobby/Lobby.json");
      this.load.image("LobbyTiles", "assets/tilemap/Lobby/floor.png");
      MainCharacter.preload(this);
      this.lastPosition = {
         nickname: "someone",
         x: 550,
         y: 500,
         isMoving: true,
      };
      // 캐릭터 스킨들 싹다 preload
      // Anims.preaload(this);
   }

   create() {
      this.keyMapping();
      this.networkSetting();
      // this.myInfo 바꾸기 (JWT)
      this.getMyInfo();
      const underCharacterGroup = this.createUnderCharacterGrounp();
      this.createMyCharacter();
      // OtherCharacters는 update에서 생성/이동/삭제
      const overCharacterGroup = this.createOverCharacterGroup();
      const collisionBodies = this.createCollidesLayer();
      this.addCollider(
         underCharacterGroup,
         this.character,
         overCharacterGroup,
         collisionBodies
      );
      this.setOnChatBox();
   }

   update(time: number, delta: number): void {
      this.setInterval(this.sendPlayerPosition, 100 /*0.1s*/, delta);
      this.character.update(this.cursor);
      this.updateOtherCharacters();
      // this.checkFocusChat();
   }

   // Methods - init

   destroyCharacters() {
      this.children.each((child) => {
         if (
            child instanceof Phaser.Physics.Arcade.Sprite ||
            child instanceof Phaser.GameObjects.Text ||
            child instanceof Phaser.GameObjects.Image
         ) {
            child.destroy();
         }
      });
   }

   // Methods - create

   keyMapping() {
      // Arrow key mapping
      this.cursor = this.input.keyboard.createCursorKeys();

      this.keyEnter = this.input.keyboard.addKey(
         Phaser.Input.Keyboard.KeyCodes.ENTER
      );
      this.input.keyboard.addCapture(Phaser.Input.Keyboard.KeyCodes.ENTER);

      const handleChatFocus = () => {
         this.registry.get("handleChatFocus")();
         this.disableArrowKeys();
      };

      this.keyEnter.on("down", handleChatFocus);
   }

   disableArrowKeys() {
      this.cursor.up.enabled = false;
      this.cursor.down.enabled = false;
      this.cursor.left.enabled = false;
      this.cursor.right.enabled = false;
   }

   enableArrowKeys() {
      this.cursor.up.enabled = true;
      this.cursor.down.enabled = true;
      this.cursor.left.enabled = true;
      this.cursor.right.enabled = true;
   }

   networkSetting() {
      this.network = Network.getInstance();
      const setLastState = (state: LobbyState) => {
         this.lastState = state.players;
      };
      const pushChat = (chat: Chat) => {
         if (!(typeof chat === "string")) this.lastChat.push(chat);
      };
      this.network.joinRoom("MyLobbyRoom").then(() => {
         this.network.createWebSocketMessageMethods(
            this,
            setLastState,
            pushChat
         );
         this.events.on("shutdown", this.network.leaveRoom, this);
      });
   }
   getMyInfo() {
      // verifyJWT()
   }

   createUnderCharacterGrounp() {
      this.map = this.make.tilemap({ key: "LobbyMap" });
      const FloorAndWalls = this.map.addTilesetImage("floor", "LobbyTiles");
      const LobbyFloorAndWalls = this.map
         .createLayer("LobbyFloorAndWalls", FloorAndWalls, 0, 0)
         .setScale(3)
         .setDepth(DEPTH.Floor)
         .setCollisionByProperty({ collides: true });
      const ObjectsUnderCharacter = this.map
         .createLayer("ObjectsUnderCharacter", FloorAndWalls, 0, 0)
         .setScale(3)
         .setDepth(DEPTH.ObjectUnderCharacter)
         .setCollisionByProperty({ collides: true });

      const underCharacterGroup = this.add.group();
      underCharacterGroup.addMultiple([
         LobbyFloorAndWalls,
         ObjectsUnderCharacter,
      ]);

      return underCharacterGroup;
   }
   createMyCharacter() {
      this.character = new MainCharacter(
         this,
         this.lastPosition.x,
         this.lastPosition.y
      );
      this.character.setDepth(DEPTH.MainCharacter);
   }
   createOverCharacterGroup() {
      const FloorAndWalls = this.map.getTileset("LobbyTiles");
      const ObjectsOverCharacter = this.map
         .createLayer("ObjectsOverCharacter", FloorAndWalls, 0, 0)
         .setScale(3)
         .setDepth(DEPTH.ObjectOverCharacter);

      const overCharacterGroup = this.add.group();
      overCharacterGroup.addMultiple([ObjectsOverCharacter]);
      return overCharacterGroup;
   }
   createCollidesLayer() {
      const CollidesLayer = this.map.getObjectLayer("CollidesLayer").objects;
      const collisionBodies: GameObjects.GameObject[] = [];
      CollidesLayer.forEach((object) => {
         if (!(object.x && object.y && object.width && object.height)) {
            return;
         }
         const body = this.physics.add
            .staticImage(
               (object.x + object.width / 2) * 3,
               (object.y + object.height / 2) * 3,
               "__DEFAULT"
            )
            .setSize(object.width * 3, object.height * 3);

         collisionBodies.push(body);
      });
      return collisionBodies;
   }
   addCollider(
      underCharacterGroup: GameObjects.Group,
      character: MainCharacter,
      overCharacterGroup: GameObjects.Group,
      collisionBodies: GameObjects.GameObject[]
   ) {
      this.physics.add.collider(character, [
         underCharacterGroup,
         overCharacterGroup,
      ]);
      this.physics.add.collider(character, collisionBodies);
   }
   setOnChatBox() {
      const handleChatOn = this.registry.get("handleChatOn");
      const handleChatOff = this.registry.get("handleChatOff");
      handleChatOn();
      this.events.on("shutdown", handleChatOff, this);
   }

   setInterval(callback: Function, interval: number, delta: number) {
      this.elapsedTime += delta;
      if (this.elapsedTime >= interval) {
         callback();
         this.elapsedTime = 0;
      }
   }
   sendPlayerPosition = () => {
      if (!this.character || !this.network) return;
      if (
         this.character.x !== this.lastPosition.x ||
         this.character.y !== this.lastPosition.y ||
         this.character.isMoving !== this.lastPosition.isMoving
      ) {
         this.lastPosition = {
            nickname: "someone",
            x: this.character.x,
            y: this.character.y,
            isMoving: this.character.isMoving,
         };
         this.network.send("move", this.lastPosition);
      }
   };
   updateOtherCharacters() {
      this.lastState.forEach((state, key) => {
         // 기존에 존재하는 캐릭터는 update(move)
         if (this.otherCharacters.has(key)) {
            const character = this.otherCharacters.get(key);
            character?.update(state.x, state.y, state.isMoving);
            // 기존에도 buffer에도 없는 캐릭터는 create
         } else if (!this.createCharacterBuffer.has(key)) {
            this.createCharacterBuffer.set(key, state);
            OtherCharacter.create(this, state.nickname, state.x, state.y).then(
               (character) => {
                  this.otherCharacters.set(key, character);
                  this.createCharacterBuffer.delete(key);
               }
            );
         }
      });
      // 있던 캐릭터가 lastState로 안들어오면 delete
      this.otherCharacters.forEach((character, key) => {
         if (!this.lastState.has(key)) {
            character.destroyCharacter();
            this.otherCharacters.delete(key);
         }
      });
   }
   checkFocusChat() {
      const isFocusChat: boolean = this.registry.get("isFocusChat")();
      if (isFocusChat) {
         this.disableArrowKeys();
      } else {
         this.enableArrowKeys();
      }
   }
}

export default Lobby;
