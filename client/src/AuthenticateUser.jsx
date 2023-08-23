import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:  JSON.stringify({ username, password })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.token !== "invalid") {
            setIsLoggedIn(true);
            setToken(data.token);
        } else {
            console.log("Invalid username or password")
            alert("Invalid credentials.")
            setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  if (isLoggedIn) {
    return <div>You are logged in with token: {token}</div>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;