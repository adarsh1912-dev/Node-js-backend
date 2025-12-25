import {rename} from 'node:fs/promises'

await rename('./demo.txt','newdemo.txt');

console.log('renamed');