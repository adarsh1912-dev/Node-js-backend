
// Import required modules
import express from "express"; // Express framework
import cors from "cors"; // Middleware for enabling CORS
import directoryRoutes from "./routes/directoryRoutes.js"; // Directory-related routes
import fileRoutes from "./routes/fileRoutes.js"; // File-related routes


// Create an Express application instance
const app = express();


// Middleware to parse JSON request bodies
app.use(express.json());

// Enable Cross-Origin Resource Sharing for all routes
app.use(cors());


// Mount directory-related routes at /directory
app.use("/directory", directoryRoutes);

// Mount file-related routes at /files
app.use("/files", fileRoutes);


// Start the server on port 4000
app.listen(4000, () => {
  console.log(`Server Started`);
});
