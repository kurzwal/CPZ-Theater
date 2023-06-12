import path from "path";
import cors from "cors";
import express, { Express } from "express";
import { MongoClient, Db } from "mongodb";

import { googleLogin, verifyJWT } from "./services/googleLogin";
import { setDbInstance } from "./db";

const corsOptions = {
   origin: "http://localhost:3000", // 클라이언트 애플리케이션의 주소
   credentials: true,
   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
   allowedHeaders: ["Content-Type", "Authorization"],
};

const DB_URL =
   "mongodb+srv://openingyou:T7pgXYhuJxral3np@cluster0.0ubjx6l.mongodb.net/todoapp?retryWrites=true&w=majority";

const PORT = 8080;

export function setupExpress(app: Express) {
   app.use(express.json());
   app.use(cors(corsOptions));
   app.use(express.urlencoded({ extended: true }));
   app.use(express.json());

   // use static folder named public
   app.use("/", express.static(path.join(__dirname, "public")));

   let db: Db;

   MongoClient.connect(DB_URL)
      .then(function (client) {
         createListen(client);
         setDbInstance(db);
      })
      .catch(function (err) {
         console.log(err);
      });

   function createListen(client: MongoClient) {
      app.listen(PORT, function () {
         console.log("listening on " + PORT);
      });
      db = client.db("CPZ");
   }

   // APIs
   app.post("/google/auth", googleLogin);
   app.get("/jwtauth", verifyJWT);

   // app.get("/asdf", (req, res) => {
   //    res.send(new ObjectId())
   // })

   // 리액트 라우팅
   // app.get("*", (req, res) => {
   //    res.sendFile(path.join(__dirname + "client/build/index.html"));
   // });
}
