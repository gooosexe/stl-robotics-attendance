import "./App.css";
import "./index.css";
import React from "react";

// for changing the sign in/out button
const changeButtonStatus = (name, team) => {
  console.log(`${name} ${team}`);
}

function getMemberStatus(name, token) {
  // Returns sign in if the user is signed out
  // Returns sign out if the user is signed in
  fetch("/status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ name })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "signedIn") {
        return "Sign Out";
      } else if (data.status === "signedOut") {
        return "Sign In";
      }
    }
    );
}

function CreateMemberEntry(props) {
  const { team, name, token } = props;
  getMemberStatus(name, token);
  var buttonText = getMemberStatus(name, token);
  return (
    <tr>
      <td>{name}</td>
      <td>
        <button type="button" onClick={() => changeButtonStatus(name, team)}>
          Sign In / Out
        </button>
      </td>
    </tr>
  );
}

function GetMemberList(props) {
  const { memberList, token } = props;
  if (!Array.isArray(memberList)) {
    return <p>Member list is not available.</p>;
  }

  let xTeam = [];
  let yTeam = [];
  let zTeam = [];
  let gTeam = [];
  let tTeam = [];
  let sTeam = [];

  console.log(memberList);
  memberList.forEach((member) => {
    switch (member.team) {
      case "T":
        tTeam.push(<CreateMemberEntry team={member.team} name={member.name} token={token}/>);
        break;
      case "S":
        sTeam.push(<CreateMemberEntry team={member.team} name={member.name} token={token}/>);
        break;
      case "X":
        xTeam.push(<CreateMemberEntry team={member.team} name={member.name} token={token}/>);
        break;
      case "Y":
        yTeam.push(<CreateMemberEntry team={member.team} name={member.name} token={token}/>);
        break;
      case "Z":
        zTeam.push(<CreateMemberEntry team={member.team} name={member.name} token={token}/>);
        break;
      case "G":
        gTeam.push(<CreateMemberEntry team={member.team} name={member.name} token={token}/>);
        break;
      default:
        console.log(`Error: ${member.name} ${member.team} is not a valid team.`);
        break;
    }
  });

  return (
    <>
      <div className="gTeam">
        <h2>82855G</h2>
        <table>
          <tr>
          </tr>
          {gTeam}
        </table>
      </div>
      <div className="tTeam">
        <h2>82855T</h2>
        <table>
          <tr>
          </tr>
          {tTeam}
        </table>
      </div>
      <div className="sTeam">
        <h2>82855S</h2>
        <table>
          {sTeam}
        </table>
      </div>
      <div className="xTeam">
        <h2>82855X</h2>
        <table>
          {xTeam}
        </table>
      </div>
      <div className="yTeam">
        <h2>82855Y</h2>
        <table>
          {yTeam}
        </table>
      </div>
      <div className="zTeam">
        <h2>82855Z</h2>
        <table>
          {zTeam}
        </table>
      </div>
    </ >
  );
}


function Exec(props) {
  const { name, team, permission, token, memberList } = props;

  return (
    <div>
      <h1>
        Welcome <span style={{ color: "yellow" }} >{name}</span> from <span style={{ color: "yellow" }}>82855{team}</span>
      </h1>
      <GetMemberList memberList={memberList} token={token} />
    </div>
  );
}

export default Exec;
