import { useState } from "react";

export default function NewOrderForm({ token }) {
  const [total, setTotal] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ total }),
    });
    const data = await res.json();
    if (data.id) {
      alert("Order created!");
      setTotal("");
    } else {
      alert("Failed to create order!");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <h2>Create New Order</h2>
      <input
        placeholder="Order total ($)"
        value={total}
        onChange={(e) => setTotal(e.target.value)}
        style={{
          display: "block",
          marginBottom: "0.5rem",
          padding: "0.5rem",
          width: "100%",
        }}
      />
      <button style={{ padding: "0.5rem 1rem" }}>Submit Order</button>
    </form>
  );
}
