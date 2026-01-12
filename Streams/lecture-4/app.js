// Learning about write stream.

import fs, { read } from "node:fs"

// creating write stream.
// by default buffer size of writeStream is 16kb
// if file already exists then it will clear the contents in it
// we can set writeableHighWaterMark
//const writeStream = fs.createWriteStream('file.txt');


// Learning about backpressure
// Backpressure in writable streams in Node.js is a mechanism that helps prevent overwhelming a stream with more data than it can handle at once.
// whenever we call writeStream.write() method it returns a boolean value indicating whether there is space available in buffer or not 
//  true -> (space available we can push further)
// false -> (capacity is full must flush the buffer to maintain low memory usage).


// writing a big file using writable streams

const readable = fs.createReadStream('./largeFile.txt');

const writable = fs.createWriteStream('output.txt');// given new file name in which the data will be stored

readable.on('data', (chunk) => {
    const canWrite = writable.write(chunk);// returns true if buffer is not full 

    if(!canWrite){
        readable.pause();// pausing readable stream if buffer is full so writable stream buffer can be drained 

        writable.once('drain', () => { 
            //listening for drain event to occur so we may be able to resume writing.

            readable.resume();
        })
    }
});


// once reading is completed close writable stream

readable.on('end', () => {
    writable.end();
    console.log(`File has been written`);
})








