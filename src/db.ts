import { Db } from "mongodb";

let db: Db | null = null;

export const setDbInstance = (instance: Db) => {
   console.log("db setting")
   db = instance;
};

export const getDbInstance = (): Db | null => {
   return db;
};
