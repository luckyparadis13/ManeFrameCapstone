-- products.sql

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

INSERT INTO products (name, description, price, category, image_url, purchase_url) VALUES
('Gloss Shampoo', 'Gently cleanses while adding shine.', 28.00, 'Shampoo', '/assets/prod1.jpg', 'https://square.link/u/JH742MKD'),
('Color Protect Conditioner', 'Seals in vibrancy, smooths strands.', 32.00, 'Conditioner', '/assets/prod2.jpg', 'https://square.link/u/yy0W2d5c'),
('Deep Repair Mask', 'Nourishing weekly treatment.', 40.00, 'Treatment', '/assets/prod3.jpg', 'https://square.link/u/8UMXZyCp'),
('Volume Styling Mousse', 'Adds flexible volume & body.', 26.00, 'Styling', '/assets/prod4.jpg', 'https://square.link/u/zLsIqJY1'),
('Texturizing Spray', 'Effortless lived-in texture.', 29.00, 'Styling', '/assets/prod5.jpg', 'https://square.link/u/f9nmD8Gx'),
('Curl Enhancing Cream', 'Defines curls, reduces frizz.', 34.00, 'Styling', '/assets/prod6.jpg', 'https://square.link/u/L1QtlH3V'),
('Hydrate Shampoo', 'Boosts moisture for dry hair.', 28.00, 'Shampoo', '/assets/prod7.jpg', 'https://square.link/u/v0mjRQ64'),
('Scalp Detox Treatment', 'Removes buildup, refreshes scalp.', 38.00, 'Treatment', '/assets/prod8.jpg', 'https://square.link/u/bJ6c4FzW'),
('Leave-in Conditioner', 'Lightweight detangler & hydrator.', 30.00, 'Conditioner', '/assets/prod9.jpg', 'https://square.link/u/CfEHYHcb'),
('Shine Serum', 'Adds glossy finish & tames flyaways.', 35.00, 'Styling', '/assets/prod10.jpg', 'https://square.link/u/9cq1QjIE');
