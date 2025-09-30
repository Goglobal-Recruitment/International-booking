import React, { useState } from "react";

const RegisterModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users") || "{}");

    if (storedUsers[email]) {
      alert("User already exists. Please log in.");
      return;
    }

    storedUsers[email] = { password };
    localStorage.setItem("users", JSON.stringify(storedUsers));
    alert("Registered successfully! You can now log in.");
    // Redirect or close modal
  };

  return (
    <div>
      <h2>Register</h2>
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
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterModal;
