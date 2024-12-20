const http = require("http");

const requestHandler = (req, res) => {
  console.log(`Received request: ${req.method} for ${req.url}`);
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/" && req.method === "GET") {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "Welcome to the backend server" }));
  } else if (req.url === "/" && req.method === "POST") {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "POST request" }));
  } else if (req.url === "/" && req.method === "PUT") {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "PUT request" }));
  } else if (req.url === "/" && req.method === "PATCH") {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "PATCH request" }));
  } else if (req.url === "/" && req.method === "DELETE") {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "DELETE request" }));
  } else if (req.url === "/" && req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "OPTIONS request" }));
  } else {
    res.statusCode = 405;
    res.end(JSON.stringify({ message: "wrong request" }));
  }
};
const server = http.createServer(requestHandler);
server.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});
