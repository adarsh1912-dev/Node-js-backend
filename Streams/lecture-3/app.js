import fs from 'fs';

const readStream = fs.createReadStream('chars.txt', { highWaterMark : 4});

// it will create buffers of 4 bytes to read data

// readStream.on('data', (chunk) => {
//     console.log(chunk.toString());
// })

// it will create new array buffers one by one use them and then destroy them

// now we will learn how to use readable event 
// readable event is fired when then data gets loaded in the internal buffer

/*

readStream.on('readable', () => {
    console.log(readStream.read());
})

*/

// using setEncoding method to set character encoding in streams

readStream.setEncoding('utf-8');

readStream.on('data', (chunk) => {
    console.log(chunk);
})

// destroy method

readStream.destroy() // will destroy the stream and readStream.on('data') won't work as the stream is destroyed

// readStream.destroy will triger readStream.on('close', () =>{}) event and also 'end' event.

// close event will trigger at last

// we also have readStream.error() event it will be triggered when an error occur while reading the file or we pass an error object in destroy method -> readStream.destroy(new Error('error'));

