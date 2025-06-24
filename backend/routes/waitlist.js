// routes/waitlist.js
import express from "express";
import db from "../db/client.js";
import requireUser from "../middleware/requiredUser.js";

const waitlistRouter = express.Router();

// POST /waitlist — join waitlist
waitlistRouter.post("/", requireUser, async (req, res) => {
  const { stylist_id, requested_time } = req.body;

  try {
    const {
      rows: [entry],
    } = await db.query(
      `INSERT INTO waitlist (user_id, stylist_id, requested_time)
       VALUES ($1, $2, $3)
       RETURNING *;`,
      [req.user.id, stylist_id, requested_time]
    );

    res.status(201).json(entry);
  } catch (err) {
    console.error("Failed to join waitlist:", err);
    res.status(500).json({ error: "Failed to join waitlist." });
  }
});

// GET /waitlist — get user's waitlist entries
waitlistRouter.get("/", requireUser, async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT * FROM waitlist WHERE user_id = $1 ORDER BY requested_time;`,
      [req.user.id]
    );

    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch waitlist:", err);
    res.status(500).json({ error: "Failed to fetch waitlist." });
  }
});

export default waitlistRouter;
