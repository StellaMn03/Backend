const express = require("express");
const app = express();
const Logger = (req, res, next) => {
  const timestamp = new Date().toString();
  console.log(`[${timestamp}] Method: ${req.method}, URL: ${req.url}`);
  next();
};

app.use(Logger);
app.get("/users", (req, res) => {
  res.send("List of users");
});
app.listen(3000, () => {
  console.log("Server is running on 3000");
});
