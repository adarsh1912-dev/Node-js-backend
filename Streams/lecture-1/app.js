import fs, { lstat } from "node:fs";

// try {
//    const data = await readFile('./chars.txt');
//    console.log(data.toString()); 
// } catch (error) {
//    console.log(error); 
// }

// reading/writing big files

/*
try {
   const buff = await readFile('/home/adarsh-dev/Movies/Bollywood/Saiyaara.2025.720p.V2.HDTC.Hindi.ORG.2.0.x264.mkv');
   writeFile('movie.mkv');
} catch (error) {
   console.log(error); 
}
   ^
   |
this piece of code will throw an error because readFile can only read instances of Buffer, ArrayBuffer , string or DataView.


*/

//we use fs.createReadStream method to read files in chunks. It returns an event emitter object. We can then use methods like event.on('data', () => {});

/*

const readStream = fs.createReadStream('/home/adarsh-dev/Movies/Bollywood/Saiyaara.2025.720p.V2.HDTC.Hindi.ORG.2.0.x264.mkv');

readStream.on('data',(chunkBuffer) => {
   console.log(chunkBuffer);
   console.log(chunkBuffer.byteLength);
})

// this is how we read large files using createReadStream


*/


//we can also adjust the bytelength of our buffer stream by passing an object {highWaterMark : (size of Abuffer)} in createReadStream method

/*
const readStream = fs.createReadStream('/home/adarsh-dev/Movies/Bollywood/Saiyaara.2025.720p.V2.HDTC.Hindi.ORG.2.0.x264.mkv', { highWaterMark : 100 * 1024 * 1024});

readStream.on('data',(chunkBuffer) => {
   console.log(chunkBuffer);
   console.log(chunkBuffer.byteLength);
})

*/

// lets write a video file using streams and appendFileSync method

const readStream = fs.createReadStream('/home/adarsh-dev/Movies/Bollywood/Saiyaara.2025.720p.V2.HDTC.Hindi.ORG.2.0.x264.mkv', { highWaterMark : 100 * 1024 * 1024});

readStream.on('data', (chunkBuffer) => {
   fs.appendFileSync('saiyaara.mkv',chunkBuffer);
})

// end event 

readStream.on('end', () => {
   console.log("Process completed");
})