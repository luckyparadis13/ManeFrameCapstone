import "./Products.css";
import { useEffect, useState } from "react";

function Products({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    }

    fetchProducts();
  }, []);

  const sortedProducts = [...products]
    .filter((product) =>
      selectedCategory === "All" ? true : product.category === selectedCategory
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? parseFloat(a.price) - parseFloat(b.price)
        : parseFloat(b.price) - parseFloat(a.price)
    );

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    console.log("Cart now:", [...cart, product]);
  };

  return (
    <section className="Products">
      <h2 className="ProductsTitle">PRODUCTS</h2>

      {/* FILTERS */}
      <div style={{ marginBottom: "2rem" }}>
        <label style={{ marginRight: "1rem" }}>
          Filter by Category:
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          >
            <option value="All">All</option>
            <option value="Shampoo">Shampoo</option>
            <option value="Conditioner">Conditioner</option>
            <option value="Treatment">Treatment</option>
            <option value="Styling">Styling</option>
          </select>
        </label>

        <button
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
          style={{
            marginLeft: "1rem",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Sort Price: {sortOrder === "asc" ? "Low → High" : "High → Low"}
        </button>
      </div>

      {/* PRODUCT GRID */}
      <div className="ProductsGrid">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      <div className="ShippingNote">
        All products available for salon pickup or USPS shipping. Credit/debit
        accepted. Contact for orders & shipping rates.
      </div>
    </section>
  );
}

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="ProductCard">
      <img
        src={`/${product.image_url}`}
        alt={product.name}
        className="ProductImg"
      />

      <div className="ProductInfo">
        <h3 className="ProductName">{product.name}</h3>
        <p className="ProductDesc">{product.description}</p>
        <p className="ProductMeta">
          <span>{product.category}</span> — <span>${product.price}</span>
        </p>
        <a href={product.purchase_url} className="ProductLink">
          Purchase
        </a>
        <button className="AddToCartBtn" onClick={() => onAddToCart(product)}>
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default Products;
