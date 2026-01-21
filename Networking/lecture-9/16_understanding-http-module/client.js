
// Import the built-in 'http' module from Node.js for making HTTP requests
import http from 'node:http'

// Create an HTTP client request to send data to a server
// The options object specifies the HTTP method, target server, port, and path
const clientRequest = http.clientRequest({
    method: "POST", // HTTP method to use (POST in this case)
    hostname: "192.168.0.105", // Server IP address or hostname
    port: 4000, // Port number on which the server is listening
    path: '/file' // Path on the server to which the request is sent
});

// Send the request body and signal that the request is complete
// The string 'Hii i am client' will be sent as the POST data
clientRequest.end('Hii i am client')

// Listen for the 'response' event, which is emitted when the server responds
// response is a readable Stream here
clientRequest.on('response', (response) => {
    // The 'data' event is emitted when a chunk of data is received from the server
    response.on('data', (chunk) => {
        // Convert the received buffer chunk to a string and log it to the console
        console.log(chunk.toString());
    })
});

