// connecting our node js app to mongodb 
import { MongoClient } from "mongodb";

const url = "mongodb://admin:password123@localhost:27017/?authSource=admin";

const client = new MongoClient(url);

await client.connect()

const db = client.db('school') // returns a db object
const studentCollection = db.collection('student') // returns a collection object
const teacherCollection = db.collection('teacher') // returns a collection object


const cursor = studentCollection.find();

await cursor.forEach(doc => console.log(doc));

const cursor2 = teacherCollection.find();

await cursor2.forEach(doc => console.log(doc));







