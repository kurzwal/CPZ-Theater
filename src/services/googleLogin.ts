import { Request, Response } from "express";
import jwtDecode from "jwt-decode";
import { findUserById, registUser } from "../dbMethods";
import { Db } from "mongodb";
import { getDbInstance } from "../db";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

// 로그인 함수, 토큰 확인 함수, 토큰 재발급 함수
export const googleLogin = async (req: Request, res: Response) => {
   const db: Db = getDbInstance();
   const decodedJWT: any = await jwtDecode(req.body.credential);
   let userInfo = null;
   if (!checkGoogleToken(decodedJWT)) return res.sendStatus(400);
   userInfo = await findUserById(db, decodedJWT.email);
   if (userInfo == null) userInfo = await registUser(db, decodedJWT.email);
   else if (userInfo instanceof Error) return res.sendStatus(500);
   res.send({ token: registJWT(userInfo) });
};

export const verifyJWT = (req: Request, res: Response) => {
   try {
      const decodedPayload: any = jsonwebtoken.verify(
         req.headers.authorization,
         SECRET_KEY
      );
      const date = new Date().toISOString();
      const userInfo = {
         _id: decodedPayload._id,
         id: decodedPayload.id,
         date: date,
      };
      return res.send({ token: registJWT(userInfo) });
   } catch (error) {
      return res.send(new Error("Invalid or expired JWT token"));
   }
};

const registJWT = (userInfo: any) => {
   const retJWT = jsonwebtoken.sign(userInfo, SECRET_KEY, { expiresIn: "1h" });
   return retJWT;
};

const checkGoogleToken = (jwt: any): boolean => {
   if (
      jwt.iss &&
      jwt.nbf &&
      jwt.aud &&
      jwt.sub &&
      jwt.email &&
      jwt.exp &&
      jwt.iat &&
      jwt.iss &&
      jwt.jti
   ) {
      if (tokenExpired(jwt.exp)) return false;
      return true;
   }
   return false;
};

const tokenExpired = (exp) => {
   const currentTimestamp = Math.floor(Date.now() / 1000);
   const isTokenExpired = exp < currentTimestamp;

   if (isTokenExpired) {
      return true;
   } else {
      return false;
   }
};
