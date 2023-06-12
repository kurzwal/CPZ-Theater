import Chatting from "./components/Chatting"
export default function home() {
   return(
      <div>
         <h1>홈페이지</h1>
         <a href="/login">로그인하기</a>
         <Chatting></Chatting>
      </div>
   )
}