import React, { useState } from "react";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "{}");

    if (storedUsers[email] && storedUsers[email].password === password) {
      localStorage.setItem("loggedInUser", email);
      alert("Login successful!");
      window.location.href = "/dashboard.html"; // Or navigate in React
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginModal;
