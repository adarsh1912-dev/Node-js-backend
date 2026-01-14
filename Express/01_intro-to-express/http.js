import http from "http";

// simple http server
// req is readable stream and res is writeable stream.

const server = http.createServer((req, res) => {
  res.end("Hello from HTTP Module");
});

server.listen(3000);
