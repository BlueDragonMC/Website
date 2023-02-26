import { MongoClient } from "mongodb";
import { MONGO_HOSTNAME } from "../vars";

export const client = new MongoClient(MONGO_HOSTNAME, {
    connectTimeoutMS: 3000,
    serverSelectionTimeoutMS: 3000,
}).connect();
