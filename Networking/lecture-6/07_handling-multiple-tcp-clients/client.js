// creating a simple tcp client using net module
import net from "node:net";


// listening for any user input(from terminal) 
process.stdin.on("data", (input) => { 
  // when our program recieve data from stdin it will send it back to server using socket.write() method. 
  socket.write(input); // socket is a duplex stream which represents the connection between client and server, so we can write data to it so that it can be sent back to server
  // socket object represents the connection 
});

const socket = net.createConnection({ host: "192.168.0.105", port: 4000 }); // creating a socket to our server

socket.on("error", () => {
  console.log("Server Lost"); // handling error
});

socket.on("data", (chunk) => {
  console.log(chunk.toString()); // loging the data to  
});
