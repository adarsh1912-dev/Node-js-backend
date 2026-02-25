import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://admin:password123@localhost:27017/?authSource=admin");

await client.connect();

const db = client.db("todos");

const cursor = db.collection("todos").find();

// since cursor is async iterator we use for await loop for getting documents
// for await(const document of cursor){
//     console.log(document);
// }

console.log(await cursor.next()); // used for documents in sequence

cursor.hasNext(); // used for checking if there is next document or not 

const documents = await cursor.toArray(); // returns all documents in array

client.close();
