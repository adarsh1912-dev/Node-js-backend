// Learning about event emmiters in node js
//EventEmitter is a Functional constructor

import EventEmitter from "node:events";

//To initialize the object
const emitter = new EventEmitter();

// we can create our own custom events
emitter.on('abc', ()=>{
    console.log(`abc event fired`);
})


emitter.on('abc', () => {
    console.log(`abc event fired 2`);
})

emitter.emit('abc');

//custom events will be stored as name as the key to array of functions -> (abc : [func, func]);

//event handlers will be added according to their declarations (functions defined first wil be added first to the list)

//we can have multiple event handlers for the same event 
console.log(emitter)

// we have emitter.setMaxListeners() to limit the number of listeners

emitter.setMaxListeners(3); // setting limit on emitter with same event(name).







