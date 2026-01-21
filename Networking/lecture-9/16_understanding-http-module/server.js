// creating a simple http server using http module

import http from "node:http";

// returns a server object which is an emitts events
const server = http.createServer((request, response) => {// req is a readable stream and res is a writable stream

  console.log(request.method); // logging the req methods(get/put/post/delete etc)
  response.setHeader("Content-Length", "23");// we have a method for setting headers
  response.write("Hello from http server.");// sending message to client by writing on stream
  
  request.on("data", (chunk) => {// listening for data event, if data come from req then we will log it 

    console.log(chunk.toString());
  });
  //   response.end();
});



// server.on("request", (request, response) => {
//   console.log("Got the request");
//   response.setHeader("Content-Length", "23");
//   response.write("Hello from http server.");
//   //   response.end();
// });


// since http is based on tcp we can listen for 'connection' event and we also get socket object in the callback which is a duplex stream

// server.on("connection", (socket) => {
//   socket.on("data", (chunk) => {
//     console.log(chunk.toString());
//   });
//   socket.end("HTTP/1.1 200 OK\n\nHii from http server");
// });

server.listen(4000, "0.0.0.0", () => {
  console.log("Server started");
});
