import { MongoClient } from "mongodb";

const url = "mongodb://admin:password123@localhost:27017/?authSource=admin";

const client = new MongoClient(url);

await client.connect()

const db = client.db('school') // returns a db object

const result = await db.dropDatabase() // returns true if the database is dropped successfully

console.log(result);

// deleting a single document
const result2 = await db.collection('student').deleteOne({ name: "Adarsh" }) // returns a result object

console.log(result2);

// deleting multiple documents
const result3 = await db.collection('student').deleteMany({ age: 21 }) // returns a result object

console.log(result3);

// deleting a collection
const result4 = await db.dropCollection('student') // returns true if the collection is dropped successfully

console.log(result4);

//delete a field or property from a document
const result5 = await db.collection('student').updateOne({ name: "Adarsh" }, { $unset: { age: 1 } }) // returns a result object

console.log(result5);
