import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://admin:password123@localhost:27017/?authSource=admin");

await client.connect();

const db = client.db("todos");

const cursor = db.collection("todos").find().limit(5) // limit method will return only 5 documents(we are limiting the documents to 5)

const cursor2 = db.collection("todos").find().skip(5) // skip method will skip the first 5 documents(we are skipping the first 5 documents)

const cursor3 = db.collection("todos").find().limit(3).skip(1).sort({title : 1}); // sort method will sort the documents in ascending order(we are sorting the documents in ascending order) 
// 1 for ascending and -1 for descending

// we can also use map method on cursor

const cursor4 = db.collection("todos").find().map((document) => {
    return {
        title: document.title,
        completed: document.completed,
    }
})

// map method is used to preprocess the documents before returning them
