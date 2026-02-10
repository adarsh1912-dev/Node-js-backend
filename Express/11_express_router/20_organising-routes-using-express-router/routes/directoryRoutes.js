
// Import required modules
import express from "express"; // Express framework for routing
import { mkdir, readdir, stat } from "fs/promises"; // File system promises API
import path from "path"; // Node.js path utilities


// Create a new router instance
const router = express.Router();


// Route: GET /?*
// Description: Reads the contents of a directory inside ./storage. Returns a list of files and directories.
// The pattern '/?*' is used to match the root directory and any subdirectory (e.g., /, /foo, /foo/bar).
router.get("/?*", async (req, res) => {
  // req.params[0] contains the wildcard match after the slash (if any)
  const dirname = path.join("/", req.params[0]); // Normalize the directory path
  const fullDirPath = `./storage/${dirname ? dirname : ""}`; // Build the full path inside storage
  console.log(fullDirPath); // Log the directory being accessed
  try {
    // Read all items (files/directories) in the directory
    const filesList = await readdir(fullDirPath);
    const resData = [];
    // For each item, check if it's a directory and add to response
    for (const item of filesList) {
      const stats = await stat(`${fullDirPath}/${item}`);
      resData.push({ name: item, isDirectory: stats.isDirectory() });
    }
    // Respond with the list of items
    res.json(resData);
  } catch (err) {
    // If error (e.g., directory not found), respond with error message
    res.json({ error: err.message });
  }
});


// Route: POST /*
// Description: Creates a new directory inside ./storage at the given path.
// Example: POST /foo/bar will create ./storage/foo/bar
router.post("/*", async (req, res) => {
  const dirname = path.join("/", req.params[0]); // Normalize the directory path
  try {
    await mkdir(`./storage/${dirname}`); // Create the directory (recursive by default in Node 16+)
    res.json({ message: "Directory Created!" });
  } catch (err) {
    // If error (e.g., already exists), respond with error message
    res.json({ err: err.message });
  }
});


// Export the router to be used in the main app
export default router;
