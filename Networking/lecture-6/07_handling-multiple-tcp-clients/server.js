import net from "node:net"; // Import the built-in 'net' module to create a TCP server

// Listen for input from the terminal (standard input)
process.stdin.on("data", (input) => {
  // Convert the input Buffer to a string
  const inputStr = input.toString();
  // Split the input by space to get the client index (if provided)
  const [clientIndex] = inputStr.split(" ");

  console.log(clientIndex); // Show which client index was entered

  // Check if the first part of input is a valid number (client index)
  if (!isNaN(parseInt(clientIndex))) {
    // If a client index is provided, send the rest of the message to that specific client
    clientsList[parseInt(clientIndex)].write(inputStr.substring(1));
  } else {
    // If no valid client index, broadcast the message to all connected clients
    clientsList.forEach((socket) => {
      socket.write(input);
    });
  }
});

// Array to keep track of all connected clients
const clientsList = [];

// Create a TCP server
const server = net.createServer((socket) => {
  // This function runs every time a new client connects

  clientsList.push(socket); // Add the new client to the list

  console.log(clientsList.length); // Show the number of connected clients

  // Listen for data from this client
  socket.on("data", (chunk) => {
    console.log(chunk.toString()); // Print received data
    // Broadcast the received data to all clients (including the sender)
    clientsList.forEach((socket) => {
      socket.write(chunk);
    });
  });

  // When the client disconnects
  socket.on("close", () => {
    console.log(socket.remoteAddress, ": Client disconnected");
  });

  // Handle client errors (e.g., lost connection)
  socket.on("error", () => {
    console.log("Client Lost");
  });

  console.log("Client Connected", socket.remoteAddress); // Log new connection
});

// Start the server and listen on port 4000 for any IP address
server.listen(4000, "0.0.0.0", () => {
  console.log("Server started on port 4000");
});
