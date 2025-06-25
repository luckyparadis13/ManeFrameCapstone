// routes/orders.js
import express from "express";
import db from "../db/client.js";
import requireUser from "../middleware/requiredUser.js";

const ordersRouter = express.Router();

// POST /orders — create new order
ordersRouter.post("/", requireUser, async (req, res) => {
  const { order_date, total } = req.body;

  try {
    const {
      rows: [order],
    } = await db.query(
      order_date
        ? `INSERT INTO orders (user_id, order_date, total)
           VALUES ($1, $2, $3)
           RETURNING *;`
        : `INSERT INTO orders (user_id, total)
           VALUES ($1, $2)
           RETURNING *;`,
      order_date ? [req.user.id, order_date, total] : [req.user.id, total]
    );

    res.status(201).json(order);
  } catch (err) {
    console.error("Failed to create order:", err);
    res.status(500).json({ error: "Failed to create order." });
  }
});

// GET /orders — get user's orders
ordersRouter.get("/", requireUser, async (req, res) => {
  console.log("req.user in GET /orders:", req.user);
  try {
    const { rows } = await db.query(
      `SELECT * FROM orders WHERE user_id = $1 ORDER BY order_date DESC;`,
      [req.user.id]
    );

    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    res.status(500).json({ error: "Failed to fetch orders." });
  }
});

export default ordersRouter;
