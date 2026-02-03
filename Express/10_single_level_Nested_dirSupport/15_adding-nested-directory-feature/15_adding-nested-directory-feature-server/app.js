
// Import required modules
import express from "express"; // Express framework for building the server
import { createWriteStream } from "fs"; // For writing file streams
import { readdir, rename, rm, stat } from "fs/promises"; // Promise-based file system operations
import cors from "cors"; // Middleware to enable Cross-Origin Resource Sharing


// Initialize the Express application
const app = express();


// Middleware to parse JSON request bodies
app.use(express.json());
// Enable CORS for all routes
app.use(cors());


// Route: List files and directories in a given directory
// GET /directory/:dirname? - Optional dirname parameter for nested directories
app.get("/directory/:dirname?", async (req, res) => {
  const { dirname } = req.params; // Get directory name from route params
  const fullDirPath = `./storage/${dirname ? dirname : ""}`; // Build full path
  const filesList = await readdir(fullDirPath); // Read directory contents
  const resData = [];
  // For each item, check if it's a file or directory
  for (const item of filesList) {
    const stats = await stat(`${fullDirPath}/${item}`);
    resData.push({ name: item, isDirectory: stats.isDirectory() });
  }
  // Respond with array of file/directory info
  res.json(resData);
});


// Route: Upload a file
// POST /files/:filename - Uploads file data in request body and saves to storage
app.post("/files/:filename", (req, res) => {
  const writeStream = createWriteStream(`./storage/${req.params.filename}`); // Create a write stream to the file
  req.pipe(writeStream); // Pipe request data to the file
  req.on("end", () => {
    res.json({ message: "File Uploaded" }); // Respond when upload is complete
  });
});


// Route: Download or view a file
// GET /files/:filename?action=download - Sends file as attachment if 'download' query param is set
app.get("/files/:filename", (req, res) => {
  const { filename } = req.params;
  // If action=download, set Content-Disposition header for download
  if (req.query.action === "download") {
    res.set("Content-Disposition", "attachment");
  }
  // Send the file from the storage directory
  res.sendFile(`${import.meta.dirname}/storage/${filename}`);
});


// Route: Rename a file
// PATCH /files/:filename - Expects { newFilename } in request body
app.patch("/files/:filename", async (req, res) => {
  const { filename } = req.params;
  // Rename the file to the new filename provided in the request body
  await rename(`./storage/${filename}`, `./storage/${req.body.newFilename}`);
  res.json({ message: "Renamed" });
});


// Route: Delete a file
// DELETE /files/:filename - Deletes the specified file
app.delete("/files/:filename", async (req, res) => {
  const { filename } = req.params;
  const filePath = `./storage/${filename}`;
  try {
    await rm(filePath); // Attempt to remove the file
    res.json({ message: "File Deleted Successfully" });
  } catch (err) {
    // If file not found or error, respond with 404
    res.status(404).json({ message: "File Not Found!" });
  }
});


// Start the server on port 4000
app.listen(4000, () => {
  console.log(`Server Started`); // Log when server is running
});
