DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL NOT NULL,
  inventory INTEGER DEFAULT 0
);

-- USERS table
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

-- APPOINTMENTS table
DROP TABLE IF EXISTS appointments;

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time TIME NOT NULL,
  service_type TEXT NOT NULL,
  notes TEXT
);

-- PRODUCTS table
DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL NOT NULL,
  inventory INTEGER DEFAULT 0
);
