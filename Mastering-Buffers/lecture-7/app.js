import {writeFile} from 'fs/promises'

const arr = new Uint8Array(7);

arr[0] = 0x6b;
arr[1] = 0x72;
arr[2] = 0x69;
arr[3] = 0x73;
arr[4] = 0x68;
arr[5] = 0x6e;
arr[6] = 0x61;


// //decoder object for decoding text ;
// const decoder = new TextDecoder('utf-8');

// console.log(decoder.decode(arr));


//writing buffer to a file.
//we can write typedarray, node:Buffer, Dataview instance
writeFile('buffer-text.txt', arr);