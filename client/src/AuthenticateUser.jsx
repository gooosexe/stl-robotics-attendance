import React, { useState } from "react";
import jwt from "jwt-decode";
import "./styles/App.css";
import "./styles/index.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./Dashboard";
import Exec from "./Exec";
import Captain from "./Captain";
import Member from "./Member";
import Resources from "./Resources";

const serverIpAddress = window.location.hostname + ":3001";
// const serverIpAddress = "api2.robotics-attendance.tech"

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
    fetch(`http://${serverIpAddress}/login`, {
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
                <li>
                  <Link to="/resources">Resources</Link>
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
              <Route
                path="/resources"
                element={
                  <Resources/>
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
                <li>
                  <Link to="/resources">Resources</Link>
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
              <Route
                path="/resources"
                element={
                  <Resources/>
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
                <li>
                  <Link to="/resources">Resources</Link>
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
              <Route
                path="/resources"
                element={
                  <Resources/>
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
    <div className="bg">
      <div className="login-page">
        <div className="login-box">
          <div>
            <h1 style={{ color: "rgb(255, 197, 0)"}}>
              STL Robotics Login
            </h1> 
            {/*<img src={Logo} width={200} height={200} alt="Logo" />*/}
            <form onSubmit={handleSubmit} className="login-form">
              <label style={{}}>
                Username:
                <br />
                <input
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  style={{color: "white"}}
                />
              </label>
              <br />
              <label>
                Password:
                <br />
                <input
                  style={{color: "white"}}
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>
              <br />
              <div className="login-button">
                <button type="submit" className="login-button">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
