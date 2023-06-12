import {
   GoogleLogin,
   GoogleOAuthProvider,
   CredentialResponse,
} from "@react-oauth/google";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
   const clientId =
      "294449165494-j2odtn9h82i7mr7pn3dg6ljba5jnu834.apps.googleusercontent.com";
   const navigate = useNavigate();

   const googleLoginHandle = (credentialResponse: CredentialResponse) => {
      axios
         .post("http://localhost:8080/google/auth", {
            credential: credentialResponse.credential,
         })
         .then(function (res) {
            localStorage.setItem("token", res.data.token);
            console.log(res.data.token);
            // navigate("/theater");
         })
         .catch(function (err) {
            alert("서버 연결 중 오류가 발생했습니다.");
         });
   };
   useEffect(() => {
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
                  navigate("/theater");
               }
            })
            .catch((error) => {
               return;
            });
      }
   });

   return (
      <GoogleOAuthProvider clientId={clientId}>
         <GoogleLogin onSuccess={googleLoginHandle} />
      </GoogleOAuthProvider>
   );
};

export default GoogleLoginButton;
