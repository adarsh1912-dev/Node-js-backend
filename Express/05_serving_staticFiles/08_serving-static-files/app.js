// we will learn about serving static files -> using express.static()[for serving a dir] and res.sendFile()[for serving a file] method;
import express from "express";
import { open } from "fs/promises";

const app = express();
const port = 4000;

app.use(express.static("public"));// serving contents in the public folder

app.get("/", (req, res) => {
  res.end("Hello World!!");
});

app.get("/test", async (req, res) => {
  // const fileHandle = await open("download.mp4");
  // const readStream = fileHandle.createReadStream();
  // const stats = await fileHandle.stat();
  // res.setHeader("Content-Length", stats.size);
  // res.setHeader("Content-Type", "video/mp4");
  // res.setHeader("Accept-Ranges", "bytes");
  // readStream.pipe(res);
  res.sendFile(`${import.meta.dirname}/download.mp4`); // serving route specific file
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
