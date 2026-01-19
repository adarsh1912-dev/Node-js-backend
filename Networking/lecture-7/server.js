// creating simple http server using net module and we will send a file also 
import { createReadStream } from 'node:fs';
import net from 'node:net';

const server = net.createServer((socket) => { // creating server
    // signaling to browser that we are using http protocol 
    socket.write('http\n\n File download begin');

    // creating readStream for sending file 
    const readStream = createReadStream('/home/adarsh-dev/Videos/Party/9F064C6C-C8F7-4A22-A14C-78AF07687E85.mp4');
    
    // since socket is a duplex stream we can pipe readStream data so it will reach to client
    readStream.pipe(socket);
    
    readStream.on('end', () => {
        console.log('File sent'); // handling end event
    })
});


server.listen(4000, '0.0.0.0');

server.on('listening', () => {
    console.log('server is listening on https://localhost:4000');
})