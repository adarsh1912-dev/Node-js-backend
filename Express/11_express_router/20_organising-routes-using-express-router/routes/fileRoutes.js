
// Import required modules
import express from "express"; // Express framework for routing
import { createWriteStream } from "fs"; // For writing file streams
import { rename, rm } from "fs/promises"; // File system promises API
import path from "path"; // Node.js path utilities


// Create a new router instance
const router = express.Router();


// Route: POST /*
// Description: Uploads a file to the given path inside ./storage.
// The file data is piped directly from the request body.
router.post("/*", (req, res) => {
  const filePath = path.join("/", req.params[0]); // Normalize the file path
  const writeStream = createWriteStream(`./storage/${filePath}`); // Create a write stream to the file
  req.pipe(writeStream); // Pipe request data to the file
  req.on("end", () => {
    res.json({ message: "File Uploaded" }); // Respond when upload is complete
  });
});


// Route: GET /*
// Description: Serves a file for download or viewing from ./storage at the given path.
// If ?action=download is set, sets Content-Disposition for download.
// Note: Path traversal vulnerability warning (should sanitize input in production).
router.get("/*", (req, res) => {
  const filePath = path.join("/", req.params[0]); // Normalize the file path
  if (req.query.action === "download") {
    res.set("Content-Disposition", "attachment"); // Set header for file download
  }
  res.sendFile(`${process.cwd()}/storage/${filePath}`, (err) => {
    if (err) {
      res.json({ error: "File not found!" }); // Respond if file not found
    }
  });
});


// Route: PATCH /*
// Description: Renames a file in ./storage. Expects newFilename in request body.
router.patch("/*", async (req, res) => {
  const { 0: filePath } = req.params; // Get the file path from params
  await rename(`./storage/${filePath}`, `./storage/${req.body.newFilename}`); // Rename the file
  res.json({ message: "Renamed" }); // Respond with success
});


// Route: DELETE /*
// Description: Deletes a file or directory (recursively) from ./storage at the given path.
router.delete("/*", async (req, res) => {
  const { 0: filePath } = req.params; // Get the file path from params
  try {
    await rm(`./storage/${filePath}`, { recursive: true }); // Remove file or directory
    res.json({ message: "File Deleted Successfully" }); // Respond with success
  } catch (err) {
    res.status(404).json({ message: err.message }); // Respond with error if not found
  }
});


// Export the router to be used in the main app
export default router;
