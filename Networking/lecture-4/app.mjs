// simple tcp client in node js

import net from 'net';

const client = net.createConnection({ port: 4000, host: '192.168.0.9' }, () => { // returns a duplex stream
	console.log('Connected to server');
	client.write('Hello from TCP client!');
});

client.on('data', (data) => {
	console.log('Received from server:', data.toString());
	client.end();
});

client.on('end', () => {
	console.log('Disconnected from server');
});

client.on('error', (err) => {
	console.error('Connection error:', err.message);
});
