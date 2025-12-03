//creating custom require function as loadModule
const b = loadModule('./math.js')

function loadModule(path){
    const fs = require('fs'); //fs module for reading and writing opertaions
    // if(!path.endswith('.js')){
    //     path += ".js";
    // }
    const fileContent = fs.readFileSync(path).toString(); 
    eval(fileContent);
    console.log(fileContent);
};