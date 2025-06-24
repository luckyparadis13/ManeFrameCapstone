import jwt from "jsonwebtoken";

export default function requiredUser(req, res, next) {
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
    console.error("Token error:", err);
    res.status(401).json({ error: "Invalid or expired token." });
  }
}
