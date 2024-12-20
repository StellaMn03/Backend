const express = require("express");
const app = express();

let users = [];
let products = [];
let orders = [];

app.post("/users/register", (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    try {
      const { username, email, password, is_admin = false } = JSON.parse(body);
      if (username.length < 3) {
        return res
          .status(400)
          .json({ message: "Username must be at least 3 characters long." });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters long." });
      }
      if (users.some((user) => user.email === email)) {
        return res.status(400).json({ message: "Email already exists." });
      }
      const newUser = {
        id: users.length + 1,
        username,
        email,
        password,
        is_admin,
      };
      users.push(newUser);
      const { password: _, ...userWithoutPassword } = newUser;
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      return res.status(400).json({ message: "Invalid request body." });
    }
  });
});

app.post("/users/login", (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    try {
      const { email, password } = JSON.parse(body);
      const user = users.find((user) => user.email === email);

      if (!user) {
        return res.status(400).json({ message: "User not found." });
      }
      if (user.password !== password) {
        return res.status(400).json({ message: "Incorrect password." });
      }
      const { password: _, ...userWithoutPassword } = user;
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      return res.status(400).json({ message: "Invalid request body." });
    }
  });
});

app.post("/products", (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    try {
      const {
        name,
        description,
        price,
        category,
        image_url,
        is_active = true,
      } = JSON.parse(body);
      if (!name || name.length < 1) {
        return res.status(400).json({
          error:
            "Product name is required and must be at least 1 character long.",
        });
      }
      if (price <= 0) {
        return res
          .status(400)
          .json({ error: "Product price must be greater than 0." });
      }
      const newProduct = {
        id: products.length + 1,
        name,
        description,
        price,
        category,
        image_url,
        is_active,
      };
      products.push(newProduct);

      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ error: "Invalid JSON data." });
    }
  });
});

app.post("/orders", (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    try {
      const {
        user_id,
        products: orderProducts,
        total_price,
        status = "PENDING",
      } = JSON.parse(body);
      if (!orderProducts || orderProducts.length === 0) {
        return res
          .status(400)
          .json({ error: "Order must contain at least one product." });
      }
      for (const product of orderProducts) {
        if (!product.quantity || product.quantity <= 0) {
          return res.status(400).json({
            error: "Invalid quantity",
          });
        }
      }
      if (total_price <= 0) {
        return res
          .status(400)
          .json({ error: "Total price must be greater than 0." });
      }
      const newOrder = {
        id: orders.length + 1,
        user_id,
        products: orderProducts,
        total_price,
        status,
      };
      orders.push(newOrder);
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(400).json({ error: "Invalid JSON data." });
    }
  });
});
app.get("/products", (req, res) => {
  res.status(200).json(products);
});
app.get("/orders", (req, res) => {
  res.status(200).json(orders);
});
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
