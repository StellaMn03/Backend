const fs = require("fs");
const fd = fs.openSync("data.txt", "r");
fs.readSync(fd, buffer, 0, buffer.length, 0);
console.log("file contain:\n", buffer.toString());
fs.closeSync(fd);
