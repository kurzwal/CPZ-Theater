import { useEffect } from "react";
import Phaser from "phaser";

import Chatting from "./components/Chatting";

import Background from "../scenes/Background";
import Opening from "../scenes/Opening";
import Preload from "../scenes/Preload";
import MyRoom from "../scenes/MyRoom";
import GoToLobby from "../scenes/GoToLobby";
import GoToTheater from "../scenes/GoToTheater";
import Lobby from "../scenes/Lobby";
import Theater from "../scenes/Theater";
import GlobalMenuIcon from "../scenes/GlobalMenuIcon";
import GlobalMenu from "../scenes/GlobalMenu";
import BoxOffice from "../scenes/BoxOffice";

import { useChatStore } from "../stores/chattingMessageStore";
import { useServiceStore } from "../stores/pahserServiceStore";

import { Chat } from "../types/networkDtoTypes";

export default function GameView() {
   const { pushMessage } = useChatStore();
   const { setOnChatComp, setOffChatComp, setOnChatFocus, setOffChatFocus } = useServiceStore();

   const Scenes = [
      Background,
      Opening,
      Preload,
      MyRoom,
      Lobby,
      Theater,
      GlobalMenuIcon,
      BoxOffice,
      GoToLobby,
      GoToTheater,
      GlobalMenu,
   ];

   const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      backgroundColor: "#000000",
      pixelArt: true,
      scale: {
         mode: Phaser.Scale.ScaleModes.RESIZE,
         width: window.innerWidth,
         height: window.innerHeight,
      },
      physics: {
         default: "arcade",
         arcade: {
            gravity: { y: 0 },
            // debug : 이거 하면 physics 사각형 나옴
            debug: true,
         },
      },
      scene: Scenes,
   };

   useEffect(() => {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleChatOn = () => {
         // setOnChatComp();
      };

      const handleChatOff = () => {
         setOffChatComp();
      };

      const handleChatStore = (message: Chat) => {
         pushMessage(message);
      };

      const handleChatFocus = () => {
         setOnChatFocus();
      }

      const isFocusChat = () => {
         // console.log(focusChat);
         // return focusChat;
      }

      const game = new Phaser.Game({
         ...config,
         callbacks: {
            postBoot: () => {
               // 게임이 완전히 부팅된 후 호출되는 함수
               // 게임에서 `handleDataUpdate` 함수를 사용할 수 있도록 전달
               game.registry.set("handleChatOn", handleChatOn);
               game.registry.set("handleChatOff", handleChatOff);
               game.registry.set("handleChatStore", handleChatStore);
               game.registry.set("handleChatFocus", handleChatFocus);
               // game.registry.set("isFocusChat", isFocusChat);
            },
         },
      });

      return () => {
         document.body.style.overflow = originalOverflow;
         game.destroy(true);
      };
   });

   return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
         <div id="phaser-container" style={{ flex: 1 }} />
         {/* <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/9KilNvMTNTI?autoplay=1&mute=1"
            title="YouTube video player"
            style={{ position: "absolute", right: "10px" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
         ></iframe> */}
         <Chatting />
      </div>
   );
}
