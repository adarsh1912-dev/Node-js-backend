/**
 * MONGODB PROJECTION GUIDE
 * 
 * In MongoDB, "projection" means selecting only the necessary data from a document 
 * rather than selecting the entire document's data. 
 * This is similar to the "SELECT field1, field2" statement in SQL.
 * 
 * Syntax:
 * db.collection.find(query, projection)
 * 
 * The second argument to the find() method is the projection object.
 */

// 1. Inclusion (1)
// Only include the specified fields.
// Example: Include only 'name' and 'email' fields.
// db.users.find({}, { name: 1, email: 1 });

// Note: The '_id' field is included by default even if not specified.

// 2. Exclusion (0)
// Exclude specific fields and return everything else.
// Example: Return everything except the 'password' field.
// db.users.find({}, { password: 0 });

// 3. Excluding the _id field
// To specifically remove the '_id' field from the output:
// db.users.find({}, { name: 1, _id: 0 });

// 4. Mixing Inclusion and Exclusion
// IMPORTANT: You cannot mix inclusion and exclusion in the same projection object,
// EXCEPT for the '_id' field.
// 
// ✅ Valid: { name: 1, email: 1, _id: 0 } (Inclusion + excluding _id)
// ✅ Valid: { password: 0, secret: 0 } (Exclusion)
// ❌ Invalid: { name: 1, password: 0 } (Throws an error!)

// 5. Array Projection
// You can also project specific items from an array using operators like $slice.
// Example: Get only the first 3 comments.
// db.posts.find({}, { comments: { $slice: 3 } });

/**
 * WHY USE PROJECTION?
 * - Performance: Reduces the amount of data sent over the network.
 * - Privacy: Prevents sensitive fields (like passwords/tokens) from reaching the client.
 * - Processing: Makes the returned documents easier to work with in your application code.
 */


// in node js you will have to use {projection: {field1: 1, field2: 1}} instead of {field1: 1, field2: 1}

// example

const cursor = db.collection("todos").find({}, { projection: { title: 1, completed: 1 } });

// in mongo shell you can use db.collection.find({}, {title: 1, completed: 1})

// in node js you can use {projection: {field1: 1, field2: 1}} instead of {field1: 1, field2: 1}

// example

const cursor2 = db.collection("todos").find({}, { projection: { title: 1, completed: 1 } });
