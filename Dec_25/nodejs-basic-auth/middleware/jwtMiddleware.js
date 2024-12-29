const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).send("Unauthenticated user");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send("Token is invalid");
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
