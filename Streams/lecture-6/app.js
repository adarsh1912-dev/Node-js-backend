// we will learn about pipe method on readStream so we may not have to handle the backpressure manually it will be done automatically.


import fs from "node:fs";
import { pipeline } from "node:stream";

// Create a ReadStream with a highWaterMark of 100MB
const readStream = fs.createReadStream('/home/adarsh-dev/Videos/Party/99DC4ACD-5568-4772-B665-8AE70644592B-2.mp4', {
	highWaterMark: 100 * 1024 * 1024 // 100MB
});

// Create a WriteStream with a highWaterMark of 10MB
const writeStream = fs.createWriteStream('output.mp4', {
	highWaterMark: 10 * 1024 * 1024 // 10MB
});

readStream.on('data', (chunk) => {

    const isWritable = writeStream.write(chunk);

    if(!isWritable){
        readStream.pause();

        writeStream.once('drain', () => {
            readStream.resume();
        })
    }

})

// now we can simply use pipe method to write files using writeable stream and we will not have to manually handle backpressure

readStream.pipe(writeStream); // it is that simple.

// but we will not use any of these methods for read/write operation rather we will use pipeline mehod from stream module which also provides us error handling we will use that method.

pipeline(readStream,writeStream,(err) => {
    console.log(err);
})

readStream.on('end', () => {
    writeStream.end(() => {
        console.log(`file copied`);
    })
})
