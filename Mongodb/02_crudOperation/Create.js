// connecting our node js app to mongodb 
import { MongoClient } from "mongodb";

const url = "mongodb://admin:password123@localhost:27017/?authSource=admin";

const client = new MongoClient(url);

await client.connect()

const db = client.db('school') // returns a db object

const studentCollection = db.collection('student') // returns a collection object
const teacherCollection = db.collection('teacher') // returns a collection object

const result1 = await studentCollection.insertOne({ // returns a result object
    name: "Adarsh",
    age: 21,
    course: "Computer Science"
})

const result2 = await teacherCollection.insertMany([ // returns a result object
    {
        name: "Adarsh",
        age: 21,
        course: "Computer Science"
    },
    {
        name: "prasun",
        age: 21,
        course: "Maths"
    },
    {
        name: "pralav",
        age: 21,
        course: "Physics"
    }
])

console.log(result1);
console.log(result2);

