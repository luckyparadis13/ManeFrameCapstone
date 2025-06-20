import express from "express";
import "dotenv/config";
import usersRouter from "./routes/users.js";
import productsRouter from "./routes/products.js";

const app = express();

app.use(express.json()); // always FIRST!

app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.get("/", (req, res) => {
  res.send("ManeFrame backend running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
