import express from "express";
const productsRouter = express.Router();

import db from "../db/client.js";
import jwt from "jsonwebtoken";

// Middleware to require user
function requireUser(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token missing or malformed." });
  }
  const token = auth.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token." });
  }
}

// GET /products — list all products
productsRouter.get("/", async (req, res) => {
  try {
    const { rows } = await db.query(`SELECT * FROM products ORDER BY id;`);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products." });
  }
});

// GET /products/:id — get product details
productsRouter.get("/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const {
      rows: [product],
    } = await db.query(`SELECT * FROM products WHERE id = $1;`, [productId]);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch product." });
  }
});

// POST /products — create product (admin only, simple example)
productsRouter.post("/", requireUser, async (req, res) => {
  const { title, description, price, inventory } = req.body;

  try {
    const {
      rows: [product],
    } = await db.query(
      `
      INSERT INTO products (title, description, price, inventory)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [title, description, price, inventory]
    );

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create product." });
  }
});

// PUT /products/:id — update product
productsRouter.put("/:id", requireUser, async (req, res) => {
  const productId = req.params.id;
  const { title, description, price, inventory } = req.body;

  try {
    const {
      rows: [product],
    } = await db.query(
      `
      UPDATE products
      SET title = $1, description = $2, price = $3, inventory = $4
      WHERE id = $5
      RETURNING *;
      `,
      [title, description, price, inventory, productId]
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update product." });
  }
});

// DELETE /products/:id — delete product
productsRouter.delete("/:id", requireUser, async (req, res) => {
  const productId = req.params.id;

  try {
    const {
      rows: [deleted],
    } = await db.query(`DELETE FROM products WHERE id = $1 RETURNING *;`, [
      productId,
    ]);

    if (!deleted) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.json({ message: "Product deleted.", deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete product." });
  }
});

export default productsRouter;
