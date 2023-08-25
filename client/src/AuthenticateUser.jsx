import React, { useState, useEffect } from "react";
import jwt from "jwt-decode";
import "./App.css";
import "./index.css";
import Logo from "./roboticsLog.png";

import Exec from "./Exec";
import Captain from "./Captain";
import Member from "./Member";

function Login() {
  const [username, setUsername] = useState("");
  const [name , setName] = useState("");
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
      body: JSON.stringify({ username, password })
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

          console.log("TOKEN IS: " + data.token);
          console.log("PERMISSION IS: " + decoded.permission);
          console.log("NAME IS: " + decoded.name);
          console.log("TEAM IS: " + decoded.team);
          console.log("MEMBERLIST IS: " + decoded.memberList);

          // Test the token
          fetch("/protected", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${data.token}`
            }
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
            }
            )
            .catch((error) => {
              console.error("Error:", error);
            }
            );
        } else {
          console.log("Invalid username or password")
          alert("Invalid credentials.")
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
        console.log("exec"); 
        return (<Exec name={name} team={team} permission={permission} token={token} memberList={memberList}/>);
        break;
      case "captain":
        console.log("captain");
        return (<Captain name={name}  team={team} permission={permission} token={token} memberList={memberList}/>);
        break;
      case "member":
        console.log("member");
        return (<Member />);
        break;
      default:
        {alert("what the fuck man")}
        break;
    }
    return <div>
      {/** <add an image  */}
      <h1>Welcome {name} on team {team}!</h1>
      <p>You are logged in with token: {token}</p>
      </div>;
  }
  return (
    <><img src={Logo} alt="Logo" />
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
    </form></>
  );
}

export default Login;