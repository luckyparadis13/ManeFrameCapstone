import express from "express";
import db from "../db/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// POST /users/register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const { rows: existingUsers } = await db.query(
      `SELECT * FROM users WHERE username = $1;`,
      [username]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ error: "Username already taken." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const {
      rows: [user],
    } = await db.query(
      `INSERT INTO users (username, password)
       VALUES ($1, $2)
       RETURNING id, username;`,
      [username, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully!", user });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Failed to register user." });
  }
});

// POST /users/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user
    const {
      rows: [user],
    } = await db.query(`SELECT * FROM users WHERE username = $1;`, [username]);

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    // Create token with { id: user.id }
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ error: "Failed to login." });
  }
});

export default router;
