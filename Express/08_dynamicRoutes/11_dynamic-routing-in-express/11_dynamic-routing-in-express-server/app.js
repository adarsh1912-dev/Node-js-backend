// Import express for creating the server and handling routes
import express from "express";
// Import file system promises for async file operations
import { readdir, rename, rm } from "fs/promises";


// Initialize the Express application
const app = express();


// Middleware to parse incoming JSON requests
app.use(express.json());


// Enable CORS for all origins, methods, and headers
app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*", // Allow requests from any origin
    "Access-Control-Allow-Methods": "*", // Allow all HTTP methods
    "Access-Control-Allow-Headers": "*", // Allow all headers
  });
  next();
});


// Route: GET /  -- List all files in the 'storage' directory
app.get("/", async (req, res) => {
  // Read all filenames from the storage directory
  const filesList = await readdir("./storage");
  // Respond with the list of files as JSON
  res.json(filesList);
});


// Route: GET /:filename  -- Serve a specific file
app.get("/:filename", (req, res) => {
  const { filename } = req.params;
  // If the query parameter 'action' is 'download', set header for file download
  if (req.query.action === "download") {
    res.set("Content-Disposition", "attachment");
  }
  // Send the requested file from the storage directory
  res.sendFile(`${import.meta.dirname}/storage/${filename}`);
});


// Route: PATCH /:filename  -- Rename a file
app.patch("/:filename", async (req, res) => {
  const { filename } = req.params;
  // Rename the file to the new filename provided in the request body
  await rename(`./storage/${filename}`, `./storage/${req.body.newFilename}`);
  res.json({ message: "Renamed" });
});


// Route: DELETE /:filename  -- Delete a file
app.delete("/:filename", async (req, res) => {
  const { filename } = req.params;
  const filePath = `./storage/${filename}`;
  try {
    // Attempt to remove the file
    await rm(filePath);
    res.json({ message: "File Deleted Successfully" });
  } catch (err) {
    // If file not found or error occurs, send 404 response
    res.status(404).json({ message: "File Not Found!" });
  }
});


// Start the server on port 4000
app.listen(4000, () => {
  console.log(`Server Started`);
});
