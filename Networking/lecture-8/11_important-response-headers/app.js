import { createReadStream } from "node:fs";
import { open } from "node:fs/promises";
import net from "node:net";

/**
 * This script demonstrates how to build a low-level HTTP server using Node.js's 'net' module.
 * Unlike the 'node:http' module, which handles the HTTP protocol abstraction for us,
 * 'node:net' operates at the TCP layer. This means we must manually construct and 
 * write the HTTP response strings (Status line, Headers, and Body) to the socket.
 */

const server = net.createServer(async (socket) => {
  /**
   * Handle incoming TCP connections. 
   * 'socket' represents the full-duplex communication channel between server and client.
   */

  // Note: Ensure the file path exists. 'story.mp4' is used here as an example.
  // Using fileHandle.stat() to get the correct Content-Length for the HTTP header.
  const fileHandle = await open("story.mp4");
  const { size } = await fileHandle.stat();
  const readStream = fileHandle.createReadStream();

  // --- HTTP RESPONSE CONSTRUCTION ---

  // 1. Status Line: Protocol, Status Code, and Status Message.
  socket.write("HTTP/1.1 200 OKAY\n");

  // 2. Content-Type: Tells the browser what kind of data is being sent.
  // MIME type for MP4 video is 'video/mp4'.
  socket.write("Content-Type: video/mp4\n");

  // 3. Content-Length: Crucial for the client to know how many bytes to expect.
  // It allows the browser to show a progress bar and manage the connection properly.
  socket.write(`Content-Length: ${size}\n`);

  // 4. Content-Disposition: Directs the browser on how to handle the content.
  // 'attachment' forces a download, and 'filename' suggests the saved file's name.
  // If set to 'inline' (or omitted), the browser would attempt to play it inside the window.
  socket.write("Content-Disposition: attachment; filename=story.mp4");

  // 5. Empty Line: Signals the end of the HTTP headers and the start of the body.
  socket.write("\n\n");

  // --- STREAM PIPING ---

  // Efficiently transfer the file data to the socket without loading the whole file into memory.
  // readStream.pipe(socket) handles backpressure and automatically ends the transfer.
  readStream.pipe(socket);

  readStream.on("end", () => {
    console.log("File streaming completed");
  });

  // --- SOCKET EVENT LISTENERS ---

  // Listen for incoming data from the client (e.g., the HTTP request).
  socket.on("data", (chunk) => {
    console.log("Received data from client:\n", chunk.toString());
  });

  // Triggered when the TCP connection is closed.
  socket.on("close", () => {
    console.log(socket.remoteAddress, ": Client disconnected");
  });

  // Error handling for unexpected connection issues.
  socket.on("error", (err) => {
    console.log("Client connection error:", err.message);
  });

  console.log("Client Connected", socket.remoteAddress);
});

// Start the server on port 4000. '0.0.0.0' makes it accessible on all network interfaces.
server.listen(4000, "0.0.0.0", () => {
  console.log("Server started on port 4000");
  console.log("Visit http://localhost:4000 in your browser to test.");
});
