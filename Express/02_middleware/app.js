// we will learn about middleware in express
// middlewares are functions

/*

In Express, middleware functions are functions that have access to the request (req), response (res), and the next middleware function in the application’s request-response cycle.

Middleware can:

->Execute code
->Modify req and res objects
->End the request-response cycle
Call next() to pass control to the next middleware

They are used for tasks like logging, authentication, parsing request bodies, error handling, and more. Middleware is added using app.use() or directly in route definitions.


*/

// there are two types of request handler middlewares 
// 1 -> Request Handler Middleware.(functions with 2/3 parameters)
// 2 -> error handling middleware.(function with 4 parameters).

import express from "express";

const app = express();
const port = 4000;

app.get("/", (req, res,next) => { // this is a request handler middleware
  res.write("Hello World 1 ");
  next(); // calling our next handler/middleware
},
 (req,res,next) => {
  res.write('hello world 2')
},
(err,req,res,next) => {
  // this is an error handler middleware
  // it will be called we pass a truthy argument in next() ( next('xyz') ).
  console.log(`Error : ${err}`);
  res.end('error found');
}
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
