const a = new ArrayBuffer(4);

//Typed Arrays
/*
    Int8Array
    Int16Array
    Int32Array
    BigInt64Array

    Uint8Array
    Uint16Array
    Uint32Array
    BigUint64Array

    Float32Array
    Float64Array
    Uint8ClampedArray

*/

const uint8array = new Uint8Array(a);
const uint16array = new Uint16Array(a);
const uint32array = new Uint32Array(a);

console.log(uint8array);
console.log(uint16array);
console.log(uint32array);

//short hand for creating array buffers
const u8array = new Uint8Array(10);

// for adding resizable property in array buffer we must pass an option { maxByteLength: 16/17/18 etc}.

/*
    The maxByteLength option in JavaScript is used when creating a resizable ArrayBuffer. It specifies the maximum size (in bytes) that the buffer can be resized to.
*/

const ab = new ArrayBuffer(30, { maxByteLength: 100 });

console.log(ab);

ab.resize(60);

console.log(ab);