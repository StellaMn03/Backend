const fs = require("fs");
const fd = fs.openSync("data.txt", "r");
const stats = fs.fstatSync(fd);
const fileLength = stats.size;
console.log("length:", fileLength);
const middle = Math.floor(fileLength / 2);
const buffer = Buffer.alloc(10);
fs.readSync(fd, buffer, 0, 10, middle);
console.log("string` \n", buffer.toString());
fs.closeSync(fd);