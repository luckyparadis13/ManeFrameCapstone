import { useState } from "react";

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.token) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
    } else {
      alert("Login failed!");
    }
  }

  return (
    <form onSubmit={handleLogin} style={{ marginBottom: "1rem" }}>
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          display: "block",
          marginBottom: "0.5rem",
          padding: "0.5rem",
          width: "100%",
        }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          display: "block",
          marginBottom: "0.5rem",
          padding: "0.5rem",
          width: "100%",
        }}
      />
      <button style={{ padding: "0.5rem 1rem" }}>Login</button>
    </form>
  );
}
