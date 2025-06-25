# ManeFrame Capstone — Backend

---

## Description

ManeFrame is a full-stack salon booking and retail app designed to simplify appointment scheduling, waitlist management, and retail product sales for salons and independent stylists.

This repo contains the **backend API**, built with:

- Express
- PostgreSQL
- bcrypt (for password hashing)
- JWT (for token-based auth)

---

ManeFrame Backend API
Fullstack Capstone Project — June 2025
Author: Lucky Paradis

Project Overview
This is the backend API for ManeFrame, a salon appointment and product management system.

-Built with:
-Node.js
-Express
-PostgreSQL
-RESTful API
-JWT Authentication

Database
The database includes:
-users — for user authentication (username, password)
-products — available salon products
-appointments — customer appointment scheduling
-orders — orders placed by logged-in users

Setup Instructions
1️⃣ Install dependencies:
npm install

2️⃣ Create the database:
createdb maneframe

3️⃣ Run schema + seed:
psql postgres://luckyparadis@localhost:5432/maneframe < db/schema.sql
psql postgres://luckyparadis@localhost:5432/maneframe < db/seed.sql

4️⃣ Start the server:
npm start

5️⃣ Testing API:
Login:
curl -X POST http://localhost:3000/users/login -H "Content-Type: application/json" -d '{"username": "luckyparadis2", "password": "secret123"}'

Use the token you receive for all protected routes below:

POST /orders:
curl -X POST http://localhost:3000/orders -H "Authorization: Bearer YOUR_TOKEN_HERE" -H "Content-Type: application/json" -d '{"order_date": "2025-07-01T14:00:00", "total": 75.00 }'

GET /orders:
curl -X GET http://localhost:3000/orders -H "Authorization: Bearer YOUR_TOKEN_HERE"

GET /products:
curl -X GET http://localhost:3000/products

Notes
schema.sql defines database tables

seed.sql preloads users + products — no need to manually register every time

JWT authentication is required for /orders

Features
✅ RESTful API
✅ Full CRUD on orders
✅ Product listing
✅ JWT auth
✅ Protected routes
✅ Database migrations via schema.sql + seed.sql

---
