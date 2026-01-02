// creating udp server

import dgram from 'node:dgram';

// creating socket (udp4 / udp6)
// returns a socket object which emmits events

const socket = dgram.createSocket('udp4');


socket.on('message', (message,remoteAddress) => {
    console.log(message.toString());
    console.log(remoteAddress);
})

/*

//binding socket
socket.bind(4000, () => {
    console.log(socket.address());
    const address = socket.address();
    console.log(`listening on ${address.port}`);
})

*/

// sending packates via udp 

/*

socket.send('Hello from node.js', 5000, '192.168.0.2');

*/

// transfering files using udp server
// not safe for transfering files as packets may get lost.

