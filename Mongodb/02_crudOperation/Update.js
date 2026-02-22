import { MongoClient } from "mongodb";

const url = "mongodb://admin:password123@localhost:27017/?authSource=admin";

const client = new MongoClient(url);

await client.connect()

const db = client.db('school');

// update a single document
const result = await db.collection('student').updateOne({ name: "Adarsh" }, { $set: { age: 22 } }) // returns a result object

console.log(result);

// update multiple documents
const result2 = await db.collection('student').updateMany({ age: 21 }, { $set: { age: 22 } }) // returns a result object

console.log(result2);

// update a field or property from a document
const result3 = await db.collection('student').updateOne({ name: "Adarsh" }, { $unset: { age: 1 } }) // returns a result object

console.log(result3);




