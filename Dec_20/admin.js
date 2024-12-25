const express = require("express");
const app = express();

const isAdmin = (req, res, next) => {
  const decoded = { user_id: 1, is_admin: true };
  if (!decoded.is_admin) {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
};

app.post("/products", isAdmin, (req, res) => {
  res.status(200).json({ message: "Success" });
});
app.listen(4000, () => {
  console.log("Server is running on 4000");
});
