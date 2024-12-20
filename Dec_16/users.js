const http = require("http");
const fs = require("fs");
const path = require("path");
const usersFile = path.join(__dirname, "users.json");
const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  if (req.method === "GET" && req.url === "/users") {
    fs.readFile(usersFile, "utf8", (err, data) => {
      if (err) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end("[]");
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
      }
    });
  } else if (req.method === "POST" && req.url === "/users") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const newUser = JSON.parse(body);
        if (!newUser.name || !newUser.age) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Name and age are required" }));
          return;
        }

        fs.readFile(usersFile, "utf8", (err, data) => {
          let users = [];
          if (err) {
            console.log("users.json not found. Creating a new file.");
            fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
          } else {
            users = JSON.parse(data);
          }
          users.push(newUser);

          fs.writeFile(usersFile, JSON.stringify(users, null, 2), (err) => {
            if (err) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: "Error saving user" }));
            } else {
              res.writeHead(201, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: "User added", user: newUser }));
            }
          });
        });
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Invalid JSON" }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
