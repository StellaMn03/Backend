const fs = require("fs");
const fd = fs.openSync("example.txt", "w+");
fs.writeSync(fd, "0123456789");
const ab = Buffer.from("AB");
fs.writeSync(fd, ab, 0, 2, 5);
const buffer = Buffer.alloc(12);
fs.readSync(fd, buffer, 0, buffer.length, 0);
console.log(buffer.toString());
fs.closeSync(fd);
