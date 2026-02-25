// simple app for inserting 25 todos in db
import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://admin:password123@localhost:27017/?authSource=admin");

await client.connect();

const db = client.db("todos");

const data = [];

for(let i=1; i<=25; i++){
    data.push({
        title: `Task ${i}`,
        completed: i%2 === 0 ? true : false,
        createdAt: new Date(),
        updatedAt: new Date(),
    })
}

await db.collection("todos").insertMany(data);

client.close();





