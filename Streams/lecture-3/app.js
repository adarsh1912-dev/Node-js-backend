import fs from 'fs';

const readStream = fs.createReadStream('chars.txt', { highWaterMark : 4});

// it will create buffers of 4 bytes to read data

// readStream.on('data', (chunk) => {
//     console.log(chunk.toString());
// })

// it will create new array buffers one by one use them and then destroy them

// now we will learn how to use readable event 
// readable event is fired when then data gets loaded in the internal buffer


readStream.on('readable', () => {
    console.log(readStream.read());
})




