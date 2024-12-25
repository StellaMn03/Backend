const express = require("express");
const app = express();
const users = [
  { id: 1, name: "Ani" },
  { id: 2, name: "Anna" },
];

const validateId = (req, res, next) => {
  if (!req.body.id) {
    return res.status(400).json({ message: "There is no id" });
  }
  next();
};
const checkExists = (req, res, next) => {
  const user = users.find((user) => user.id === req.body.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  req.body.name = user.name;
  next();
};

app.post("/orders", express.json(), validateId, checkExists, (req, res) => {
  res.status(200).json({
    message: "Success",
    info: req.body,
  });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
