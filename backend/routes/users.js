import express from "express";
const usersRouter = express.Router();

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db/client.js"; // you'll create this

// REGISTER
usersRouter.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.query(
    `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username;`,
    [username, hashedPassword]
  );

  res.json({ message: "User registered!" });
});

// LOGIN
usersRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required." });
  }

  const { rows: [user] } = await db.query(
    `SELECT * FROM users WHERE username = $1`,
    [username]
  );

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
});

// REQUIRE USER
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

// ME
usersRouter.get("/me", requireUser, (req, res) => {
  res.json({ user: req.user });
});

export default usersRouter;
