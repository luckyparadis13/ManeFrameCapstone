// routes/users.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db/client.js";
import requireUser from "../middleware/requiredUser.js";

const usersRouter = express.Router();

// POST /users/register
usersRouter.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const {
      rows: [user],
    } = await db.query(
      `INSERT INTO users (username, password)
       VALUES ($1, $2)
       RETURNING id, username;`,
      [username, hashedPassword]
    );

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1w" }
    );

    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register user." });
  }
});

// POST /users/login
usersRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required." });
  }

  try {
    const {
      rows: [user],
    } = await db.query(`SELECT * FROM users WHERE username = $1`, [username]);

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1w" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to log in." });
  }
});

// GET /users/me
usersRouter.get("/me", requireUser, (req, res) => {
  res.json({ user: req.user });
});

export default usersRouter;
