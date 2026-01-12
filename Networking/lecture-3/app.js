// creating tcp server using net module

import net from "node:net"


const server = net.createServer();


//start listening
server.listen(4000);

server.on('listening', () => {
    console.log('server started at port 4000');
});


// 'connection' event will trigger when the connection will be established.
// socket is a duplex stream here.
server.on('connection', (socket) => {
    // client connection message
    console.log("Client Connected");

    socket.on('data', (chunk) => {
        console.log(chunk.toString());
    })
})