
// Import required modules
const express = require('express'); // Express framework for building web applications
const multer = require('multer');   // Multer middleware for handling file uploads
const path = require('path');       // Node.js module for handling file and directory paths
const fs = require('fs');           // Node.js module for interacting with the file system


// Initialize Express app
const app = express();
// Define the port the server will listen on
const port = 3000;


// Ensure the 'uploads' directory exists; create it if it doesn't
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


// Configure Multer storage settings
// - destination: specifies the folder to store uploaded files
// - filename: generates a unique filename using the current timestamp and original filename
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Store files in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        // Prefix filename with timestamp to avoid name collisions
        cb(null, Date.now() + '-' + file.originalname);
    }
});


// Initialize Multer with the defined storage configuration
const upload = multer({ storage: storage });


// Route: GET /
// Serves the static HTML file for the upload form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


// if a user uploads files we will get the data about files in req.file object
// Route: POST /upload
// Handles file upload from the client
// - Uses Multer middleware to process a single file with the field name 'file'
// - Returns an error if no file is uploaded
// - Responds with a success message and the uploaded filename
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send(`File uploaded successfully: ${req.file.filename}`);
});


// Start the Express server and listen for incoming requests
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
