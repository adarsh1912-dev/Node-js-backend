import express from "express";
import { readdir } from "fs/promises";// readdir function is used for reading directory contents.

const app = express();

// Enabling CORS
// enabling cors is important otherwise the browser will block the res from server due to security reasons 

// res.set() method updates the res object with given headers and send it back to browser
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

// Serving Files

// when we click a button with action( action is query parameter here) set to download the browser will send req to server with a querry action === 'download' and we are handling that event in the middleware.

// When you click a "Download" button or link in your frontend, it sends a request to the server with the query parameter action=download (for example: /filename.txt?action=download).

app.use((req, res, next) => {
  // running a custom logic before serving files 
  // in this case we are setting headers
  // in express we gets req.query object which contains parsed querry params.

  if (req.query.action === "download") {
    res.set("Content-Disposition", "attachment");
  }
  // express.static will return a middleware
  // lets see what does returned middleware perform after getting executed;

  // The middleware takes the req.url (e.g., /images/logo.png) and joins it with the directory path you provided (e.g., storage).

//It uses path.join() to create an absolute path on your server's hard drive.

//Security Check: It automatically prevents "Directory Traversal" attacks. If someone tries to request ../etc/passwd, the middleware detects the .. and ignores it to keep your server safe.

// it will then check if the file exist or not , if it does it will serve the file in chunks via streams or if it doesn't exist it will simply call next middleware.

express.static("storage")(req, res, next);
});

// Serving Dir Content
app.get("/", async (req, res) => {
  const filesList = await readdir("./storage");
  console.log(filesList);
  res.json(filesList);
});

app.listen(4000, () => {
  console.log(`Server Started`);
});
