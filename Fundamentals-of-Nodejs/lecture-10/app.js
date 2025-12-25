import fs from 'fs';

const a = fs.readFileSync(`./index.html`);// Returns a buffer 

console.log(a.toString());

//Synchronous
fs.readFile(`./index.html`,(error,data) => {
    const content = data.toString();
    console.log(data);
});

//we won't use any of these methods rather we will use `node:fs/promises`, It contains only one method
import fsPromises from 'node:fs/promises';

const b = await fsPromises.readFile(`./index.html`);
console.log(b.toString());