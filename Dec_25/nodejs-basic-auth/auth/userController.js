const fs = require("fs");
const path = require("path");
const usersPath = path.join(__dirname, "../data/users.json");

const getUsers = () => {
  if (!fs.existsSync(usersPath)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(usersPath, "utf8"));
};

const saveUsers = (users) => {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
};

module.exports = { getUsers, saveUsers };
