import React, { useState } from "react";
import jwt from "jwt-decode";
import "./App.css";
import "./index.css";
import Logo from "./roboticsLog.png";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./Dashboard";
import Exec from "./Exec";
import Captain from "./Captain";
import Member from "./Member";

function Login() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [password, setPassword] = useState("");
  const [permission, setPermission] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [memberList, setMemberList] = useState([]);

  const handleSubmit = (event) => {
    console.log(username, password);
    event.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.token !== "invalid") {
          let decoded = jwt(data.token);
          console.log(decoded);
          setPermission(decoded.permission);
          setToken(data.token);
          setIsLoggedIn(true);
          setName(decoded.name);
          setTeam(decoded.team);
          setMemberList(decoded.memberList);

          console.log("PERMISSION IS: " + decoded.permission);
          console.log("NAME IS: " + decoded.name);
          console.log("TEAM IS: " + decoded.team);
          console.log("MEMBERLIST IS: " + decoded.memberList);
        } else {
          console.log("Invalid username or password");
          alert("Invalid credentials.");
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (isLoggedIn) {
    switch (permission) {
      case "exec":
        return (
          <Router>
            <nav>
              <ul>
                <li>
                  <Link to="/">Sign In / Out</Link>
                </li>
                <li>
                  <Link to="/member">Member</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route
                path="/"
                element={
                  <Exec
                    name={name}
                    team={team}
                    permission={permission}
                    token={token}
                    memberList={memberList}
                  />
                }
              />
              <Route
                path="/dashboard"
                element={
                  <Dashboard
                    name={name}
                    team={team}
                    permission={permission}
                    token={token}
                    memberList={memberList}
                  />
                }
              />
              <Route
                path="/member"
                element={
                  <Member
                    name={name}
                    team={team}
                    permission={permission}
                    token={token}
                    memberList={memberList}
                  />
                }
              />
            </Routes>
          </Router>
        );
      case "captain":
        return (
          <Router>
            <nav>
              <ul>
                <li>
                  <Link to="/">Sign In / Out</Link>
                </li>
                <li>
                  <Link to="/member">Member</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route
                path="/"
                element={
                  <Captain
                    name={name}
                    team={team}
                    permission={permission}
                    token={token}
                    memberList={memberList}
                  />
                }
              />
              <Route
                path="/dashboard"
                element={
                  <Dashboard
                    name={name}
                    team={team}
                    permission={permission}
                    token={token}
                    memberList={memberList}
                  />
                }
              />
              <Route
                path="/member"
                element={
                  <Member
                    name={name}
                    team={team}
                    permission={permission}
                    token={token}
                    memberList={memberList}
                  />
                }
              />
            </Routes>
          </Router>
        );
      case "member":
        return (
          <Router>
            <nav>
              <ul>
                <li>
                  <Link to="/">Sign In / Out</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route
                path="/"
                element={
                  <Member
                    name={name}
                    team={team}
                    permission={permission}
                    token={token}
                  />
                }
              />
              <Route
                path="/dashboard"
                element={
                  <Dashboard
                    name={name}
                    team={team}
                    permission={permission}
                    token={token}
                  />
                }
              />
            </Routes>
          </Router>
        );
      default:
        alert("Not sure how you got here.");
        break;
    }
    return (
      <div>
        {/** <add an image  */}
        <h1>If you reached this page, please contact an executive</h1>
      </div>
    );
  }

  return (
    <>
      <img src={Logo} alt="Logo" />
      <h1>STL Robotics Attendance Login</h1>
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
    </>
  );
}

export default Login;
