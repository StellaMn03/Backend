const fs = require("fs");
const fd1 = fs.openSync("data.txt", "r");
const fd2 = fs.openSync("copy.txt", "w");
const buffer = Buffer.alloc(16);
const reads = fs.readSync(fd1, buffer, 0, buffer.length, 0);
fs.writeSync(fd2, buffer, 0, reads);
fs.closeSync(fd1);
fs.closeSync(fd2);
