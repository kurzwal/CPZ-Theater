import { Db, ObjectId } from "mongodb";
import JWT from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import { ChatMessage } from "./types/schema";
dotenv.config();

export const findUserById = async (
   db: Db,
   userId: string
): Promise<object | Error> => {
   try {
      const res = await db.collection("user").findOne({ id: userId });
      return res;
   } catch (err: any) {
      return err;
   }
};

export const registUser = async (
   db: Db,
   userId: string
): Promise<object | Error> => {
   const date = new Date().toISOString();
   const uniqueId = crypto
      .createHash("sha256")
      .update(userId + date)
      .digest("hex");
   const user = {
      _id: new ObjectId(uniqueId),
      id: userId,
      date: date,
   };

   db.collection("user")
      .insertOne(user)
      .then(function () {
         return user;
      })
      .catch(function (err: Error) {
         return err;
      });
   return new Error("db not connected");
};

export const insertChat = (db: Db, chatInstance: { id: string, message: string}) => {
   const chatMessage: ChatMessage = new ChatMessage(chatInstance.id, chatInstance.message);
   db.collection("chat")
   .insertOne(chatMessage).then(function() {
      return true
   }).catch(function () {
      return false
   })
};
