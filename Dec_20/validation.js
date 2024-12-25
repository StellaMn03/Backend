const express = require("express");
const app = express();

app.use(express.json());

const validation = (req, res, next) => {
  const { username, email, password } = req.body;
  let errors = [];
  if (!username || username.length < 3) {
    errors.push("For username at least 3 characters.");
  }
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailReg.test(email)) {
    errors.push("Invalid email");
  }
  if (!password || password.length < 6) {
    errors.push("For password at least 6 characters ");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};
app.post("/users", validation, (req, res) => {
  res.status(200).json({
    message: "Success",
    user: req.body,
  });
});

app.listen(4000, () => {
  console.log("Server running on 4000");
});
