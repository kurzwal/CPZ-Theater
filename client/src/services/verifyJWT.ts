import axios from "axios";

export function verifyJWT(errorCallback: Function) {
   const token = localStorage.getItem("token");
   if (token) {
      axios
         .get("http://localhost:8080/jwtauth", {
            headers: {
               Authorization: token,
            },
         })
         .then((response) => {
            if (response.data.token) {
               localStorage.setItem("token", response.data.token);
            } else throw new Error("로그인이 만료되었습니다.");
         })
         .catch((error: Error) => {
            alert(error.message);
            // registry에 navigate넣고 /login으로 보내기
            errorCallback();
         });
   }
}
