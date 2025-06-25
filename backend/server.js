// server.js
import express from "express";
import cors from "cors"; // ADD THIS
import "dotenv/config";

import usersRouter from "./routes/users.js";
import productsRouter from "./routes/products.js";
import appointmentsRouter from "./routes/appointments.js";
import waitlistRouter from "./routes/waitlist.js";
import ordersRouter from "./routes/orders.js";

const app = express();

console.log("Connected to DB:", process.env.DATABASE_URL);

app.use(cors()); // Should be near the top
app.use(express.json()); // always FIRST!

// ROUTES
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/appointments", appointmentsRouter);
app.use("/waitlist", waitlistRouter);
app.use("/orders", ordersRouter);

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("ManeFrame backend running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
