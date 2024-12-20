const fs = require("fs");
const fd = fs.openSync("data.txt", "w");
fs.writeSync(fd, "Hello, this is the first line.\n");
fs.writeSync(fd, "This is the second line.\n");
fs.closeSync(fd);
