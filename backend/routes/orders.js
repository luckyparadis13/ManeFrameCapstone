// routes/orders.js
import express from "express";
import db from "../db/client.js";
import requireUser from "../middleware/requiredUser.js";

const ordersRouter = express.Router();

// POST /orders — create new order
ordersRouter.post("/", requireUser, async (req, res) => {
  const { date, total } = req.body;

  try {
    const {
      rows: [order],
    } = await db.query(
      `INSERT INTO orders (user_id, date, total)
       VALUES ($1, $2, $3)
       RETURNING *;`,
      [req.user.id, date, total]
    );

    res.status(201).json(order);
  } catch (err) {
    console.error("Failed to create order:", err);
    res.status(500).json({ error: "Failed to create order." });
  }
});

// GET /orders — get user's orders
ordersRouter.get("/", requireUser, async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT * FROM orders WHERE user_id = $1 ORDER BY date DESC;`,
      [req.user.id]
    );

    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    res.status(500).json({ error: "Failed to fetch orders." });
  }
});

export default ordersRouter;
