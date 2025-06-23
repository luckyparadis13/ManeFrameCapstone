1️⃣ Start Postgres (if needed):
If your Postgres service is not running — start it:
brew services start postgresql

2️⃣ Open 1 terminal — run server:
cd backend
node server.js

You should see:
✅ Server running at http://localhost:3000

3️⃣ Open 2nd terminal — insert test data:
psql maneframe

Inside psql:
INSERT INTO products (title, description, price, inventory)
VALUES ('Shampoo', 'Great shampoo', 15.99, 10);

\q

4️⃣ Open 3rd terminal — test with curl:
curl http://localhost:3000/products

You should see your products

Summary:
✅ Terminal 1 — running node server.js
✅ Terminal 2 — insert data in Postgres
✅ Terminal 3 — test with curl

Pro tip:
If you don’t want to type INSERT each time:

✅ Run this once:

bash
Copy
Edit
psql maneframe < db/seed.sql

It will insert 10 products automatically!
