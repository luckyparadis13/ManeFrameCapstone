// routes/appointments.js
import express from "express";
import db from "../db/client.js";
import requireUser from "../middleware/requiredUser.js";

const appointmentsRouter = express.Router();

// POST /appointments — create a new appointment
appointmentsRouter.post("/", requireUser, async (req, res) => {
  const { date, time, service_type, notes } = req.body;

  console.log("req.user.id:", req.user.id);
  console.log("req.body:", req.body);

  try {
    const {
      rows: [appt],
    } = await db.query(
      `INSERT INTO appointments (user_id, date, time, service_type, notes)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *;`,
      [req.user.id, date, time, service_type, notes]
    );

    res.status(201).json(appt);
  } catch (err) {
    console.error("Failed to create appointment:", err);
    res.status(500).json({ error: "Failed to create appointment." });
  }
});

// GET /appointments — get all appointments for user
appointmentsRouter.get("/", requireUser, async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT * FROM appointments WHERE user_id = $1 ORDER BY date, time;`,
      [req.user.id]
    );

    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch appointments:", err);
    res.status(500).json({ error: "Failed to fetch appointments." });
  }
});

// DELETE /appointments/:id — cancel an appointment
appointmentsRouter.delete("/:id", requireUser, async (req, res) => {
  const { id } = req.params;

  try {
    const {
      rows: [deleted],
    } = await db.query(
      `DELETE FROM appointments WHERE id = $1 AND user_id = $2 RETURNING *;`,
      [id, req.user.id]
    );

    if (!deleted) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    res.json({ message: "Appointment canceled.", deleted });
  } catch (err) {
    console.error("Failed to cancel appointment:", err);
    res.status(500).json({ error: "Failed to cancel appointment." });
  }
});

export default appointmentsRouter;
