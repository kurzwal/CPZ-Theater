import { useState, useEffect, useRef } from "react";
import "./chatting.css";
import { useServiceStore } from "../../stores/pahserServiceStore";
import { useChatStore } from "../../stores/chattingMessageStore";

export default function Chatting() {
   // submit 되면 zustand store로 보냄
   // phaser에서 store 감시하다가 ws로 보냄
   // phaser에서 onMessage "chat" 받으면 zustand store로 보냄
   // chatting 컴포넌트에서 zustand store 감시하다가 새 멤버 생기면 채팅 요소 추가함
   // 이때, store안의 채팅 메세지가 너무 많으면 오래된 순으로 삭제함.
   const onChat = useServiceStore((state) => state.onChat);
   const chatMessages = useChatStore((state) => state.messages);
   const { focusChat, setOnChatFocus, setOffChatFocus } = useServiceStore();
   // 이거는 임시
   const setChat = useChatStore((state) => state.pushMessage);

   const [inputValue, setInputValue] = useState(""); // input 상태를 관리할 state
   const inputRef = useRef<HTMLInputElement>(null);

   const handleSubmit = (event?: React.KeyboardEvent<HTMLInputElement>) => {
      if (!event || event.key === "Enter") {
         event?.preventDefault();
         setChat(inputValue);
         setInputValue(""); // input 내용을 비움
      }
   };

   const handleOnFocus = () => {
      setOnChatFocus();
   };

   const handleOnBlur = () => {
      setOffChatFocus();
   };
   useEffect(() => {
      if (focusChat && inputRef.current) {
         inputRef.current.focus();
      }
   }, [focusChat]);

   return (
      <div
         className="chatting-wrapper"
         style={{ display: onChat ? "flex" : "none" }}
      >
         <div className="chatting-header">
            <div>　채팅창</div>
            <div className="chatting-toggle-icon">ㅜ</div>
         </div>
         <div className="chatting-footer">
            <div className="chatting-context-container">
               {chatMessages.map((message: any) => {
                  if (typeof message === "string") {
                     return <div className="chatting-context">{message}</div>;
                  } else {
                     return (
                        <div className="chatting-context">
                           {message.id} : {message.message}
                        </div>
                     );
                  }
               })}
            </div>
            <div className="chatting-input-container">
               <input
                  className="chatting-input"
                  value={inputValue}
                  onFocus={handleOnFocus}
                  onBlur={handleOnBlur}
                  ref={inputRef}
                  type="text"
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleSubmit}
               />{" "}
               <div
                  className="chatting-submit"
                  onClick={() => handleSubmit()}
               ></div>
            </div>
         </div>
      </div>
   );
}
