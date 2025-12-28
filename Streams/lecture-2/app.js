import fs from "fs";


/*

const readStream = fs.createReadStream('./chars.txt');

// check state of stream
console.log(readStream.readableFlowing); // null means stream is in initial state

console.log(readStream.readableEnded) // returns true if the file gets red completely.

console.log(readStream.isPaused()) // returns true if readStrem is paused. If the file is not being processed it will return false by default.

// if we add readStream.pause() in above then it will return true;

*/

//Learning about pause and resume method.

const readStream = fs.createReadStream('./chars.txt', {highWaterMark : 1});

readStream.on('data', (chunk) => {

    fs.appendFileSync('./abc.txt', chunk);
    readStream.pause();
    setTimeout(() => {
        readStream.resume();
    },500);

});

