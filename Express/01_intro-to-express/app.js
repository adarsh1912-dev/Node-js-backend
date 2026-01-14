import express from "express";
import http from "node:http";
const app = express(); // returns a function object of express
// express internally calls app() we just use methods like get(), put(), post()


app.disable("x-powered-by"); // disabling the header so user may not be able to inspect that the backend is written using express( it is for security purposes).


const port = 4000;

app.get("/", (req, res) => {
  res.end("Hello World! 😀");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// since our app is a handler function of http we can do this
// we can pass the handler to http.createServer method.


const server  = http.createServer(app);

server.listen(port);

// although we don't call app handler directly it is called internally by app.listen() method.
