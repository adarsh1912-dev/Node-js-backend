//app for creating a object which will contain all the words as key and value as its frequencies

import fs from 'node:fs/promises'

const text = await fs.readFile('./file-1.txt',{encoding : 'utf8'});

const wordsArray = text.split(/[\W]/).filter((w) => w);

const obj = {};

for(let word of wordsArray){
    if(!(word in obj)){
        obj[word] = 1;
    }
    else{
        obj[word]+=1;
    }
}

console.log(obj);