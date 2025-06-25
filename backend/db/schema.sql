-- USERS TABLE
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- PRODUCTS TABLE
DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  purchase_url TEXT
);

-- After running this schema.sql,
-- ALSO run:   \i /Users/luckyparadis/Desktop/coursework/CAPSTONE/ManeFrameCapstone/backend/db/products.sql


-- APPOINTMENTS TABLE
DROP TABLE IF EXISTS appointments;

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time TIME NOT NULL,
  service_type TEXT NOT NULL,
  notes TEXT
);

-- ORDERS TABLE
DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  order_date TIMESTAMP DEFAULT NOW(),
  total NUMERIC(10, 2) NOT NULL
);


