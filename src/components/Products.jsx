import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const res = await fetch("http://localhost:3000/products");
      const data = await res.json();
      setProducts(data);
    }
    getProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        {products.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ccc", padding: "1rem" }}>
            <h4>{p.title}</h4>
            <p>{p.description}</p>
            <strong>${p.price}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
