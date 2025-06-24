import { useEffect, useState } from "react";

export default function Orders({ token }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      const res = await fetch("http://localhost:3000/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrders(data);
    }
    getOrders();
  }, [token]);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h2>My Orders</h2>
      {orders.length === 0 && <p>No orders yet.</p>}
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order #{order.id} — Total: ${order.total} — Date:{" "}
            {order.order_date
              ? new Date(order.order_date).toLocaleString()
              : "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
}
