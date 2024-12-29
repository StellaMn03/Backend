const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../data/users.json");
const logsFilePath = path.join(__dirname, "../data/logs.json");

const register = (req, res) => {
  const { username, password } = req.body;
  fs.readFile(usersFilePath, "utf8", (err, data) => {
    let users = JSON.parse(data);
    if (users[username]) {
      return res.status(400).send("Username already taken");
    }

    bcrypt.hash(password, 12, (err, hashedPassword) => {
      if (err) return res.status(500).send("Error hashing password");
      users[username] = { username, password: hashedPassword };
      fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
        if (err) return res.status(500).send("Error saving user");
        res.status(200).send("Registration successful");
      });
    });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;
  fs.readFile(usersFilePath, "utf8", (err, data) => {
    const users = JSON.parse(data);
    const user = users[username];

    if (!user) {
      return res.status(401).send("User doesn`t exist");
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(401).send("Password doesn`t match");
      }
      fs.writeFile(logsFilePath, JSON.stringify(users, null, 2), (err) => {
        if (err) return res.status(500).send("Error loging user");
        res.status(200).send("Loging successful");
      });
      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ token });
    });
  });
};

const securePage = (req, res) => {
  res.status(200).send("Secure page");
};
module.exports = { register, login, securePage };
