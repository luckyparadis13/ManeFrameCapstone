// routes/products.js
import express from "express";
const productsRouter = express.Router();

import db from "../db/client.js";
import requireUser from "../middleware/requiredUser.js"; // Import shared middleware

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

// POST /products — create product
productsRouter.post("/", requireUser, async (req, res) => {
  const { name, description, price, category, image_url, purchase_url } =
    req.body;

  try {
    const {
      rows: [product],
    } = await db.query(
      `
      INSERT INTO products (name, description, price, category, image_url, purchase_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
      `,
      [name, description, price, category, image_url, purchase_url]
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
  const { name, description, price, category, image_url, purchase_url } =
    req.body;

  try {
    const {
      rows: [product],
    } = await db.query(
      `
      UPDATE products
      SET name = $1, description = $2, price = $3, category = $4, image_url = $5, purchase_url = $6
      WHERE id = $7
      RETURNING *;
      `,
      [name, description, price, category, image_url, purchase_url, productId]
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
