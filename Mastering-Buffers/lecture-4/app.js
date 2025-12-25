const a = new ArrayBuffer(4);
const view = new DataView(a);

view.setInt8(0,0x12);
view.setInt8(1,0x13);
view.setInt8(2,0x14);
view.setInt8(3,0x15);

console.log(a);