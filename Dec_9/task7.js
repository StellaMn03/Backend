const fs = require("fs");
fs.writeFileSync("message.txt", "Hello World!");
let content = fs.readFileSync("message.txt", "utf8");
let modifiedContent = content.replace("Hello", "Hello Awesome");
fs.writeFileSync("message.txt", modifiedContent);
console.log("Updated content:", modifiedContent);
