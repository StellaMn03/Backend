require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const authController = require("./auth/authController");
const jwtMiddleware = require("./middleware/jwtMiddleware");

app.post("/register", authController.register);
app.post("/login", authController.login);
app.get("/secure", jwtMiddleware.verifyToken, authController.securePage);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
