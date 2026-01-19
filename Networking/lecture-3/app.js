// creating tcp server using net module

import net from "node:net"


const server = net.createServer(); // it will return a server object.
// server is just an event emitter object.


//start listening
server.listen(4000, '0.0.0.0');

// this event will be triggered when server will start listening for requests

server.on('listening',() => {
    console.log('server started at port 4000');
});


// 'connection' event will trigger when the connection will be established.
// socket is a duplex stream here.
// node js provides us socket(duplex stream) for sharing data between client and server

server.on('connection', (socket) => {
    // client connection message
    console.log("Client Connected");
    console.log(socket.address()); // will give the address object of our server
    console.log(socket.remoteAddress); // will give address of our client
    console.log(socket.remotePort); // will give port number of our client
    console.log(socket.remoteFamily); // ipv4/ipv6.
    
    socket.on('data', (chunk) => {
        console.log(chunk.toString());
    })

    socket.on('close', () =>  {
        console.log('Client disconnected'); // listening for diconnect event.
    })
})