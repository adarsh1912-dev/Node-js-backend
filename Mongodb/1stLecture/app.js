// connecting our node js app to mongodb 
import { MongoClient } from "mongodb";

const url = "mongodb://admin:password123@localhost:27017/?authSource=admin";

const client = new MongoClient(url);

await client.connect()

const db = client.db() // returns a db object

const collections = await db.listCollections().toArray() // will return a promise which resolves with a list of all collections of db

console.log(collections);

// creating admin object to get access to whole database;

const admin = client.db.admin(); // returns admin object 

const allDbs = await admin.listDatabases() // returns a promise which will resolve with a list of databases