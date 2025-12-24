//node js buffer -> js Uint8 buffer with some extra features.
//Buffer is a function

import {Buffer} from 'buffer';

//creating a node js buffer
const nodeBuffer = Buffer.alloc(10);
console.log(nodeBuffer);

//creating a node js buffer from an array buffer

const a = new ArrayBuffer(10);
const ab = Buffer.from(a);
console.log(ab);

ab[0] = 97;
ab[1] = 98;
ab[2] = 99;
ab[3] = 100;
ab[4] = 101;

//can call toString on buffer with encoding options to get data.
console.log(`content of array buffer : ${ab.toString()}`);



