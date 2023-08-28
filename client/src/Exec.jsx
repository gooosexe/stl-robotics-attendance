import "./App.css";
import "./index.css";
import React from "react";

// for changing the sign in/out button
const changeButtonStatus = (name, team) => {
  console.log(`${name} ${team}`);
}

function signIn(name, team, token) {
  console.log(`${name} ${team}`);
  fetch("/signIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ name, team })
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });

}

function signOut(name, team) {
  console.log(`${name} ${team}`);
}

async function getMemberStatus(name, token) {
  // Returns sign in if the user is signed out
  // Returns sign out if the user is signed inc
  let status = "Error: Could not get status";
  
  status = await new Promise((resolve, reject) => {
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
        status = data.status;
        if (JSON.stringify(status) === JSON.stringify("signedOut")) {
          status = "Sign In";
        }
        else if (JSON.stringify(status) === JSON.stringify("signedIn")) {
          status = "Sign Out";
        }
        return resolve(status);
        console.log(status);
    
      }
      );
  });
  return status; 
}

function CreateMemberEntry(props) {
  const { team, name, token } = props;
  const [status, setStatus] = React.useState("Loading...");
  
  const getStatus = () => {
    getMemberStatus(name, token).then((status) => {
      console.log("Getting status"); 
      setStatus(status);
    });
  };

  React.useEffect(() => {
    getStatus();
    const intervalId = setInterval(getStatus, 1000);
    return () => clearInterval(intervalId);
  }, [name, token]);

  if (status == "Loading...") {
    return ( // thats how we do it
      <tr>
        <td>{name}</td>
        <td>
          <button type="button" style={{backgroundColor: "#ffcc00", color: "#000000"}} onClick={() => changeButtonStatus(name, team, token)}>
            {status}
          </button>
        </td>
      </tr>
    );
  } else if (status == "Sign In") {
    return (
      <tr>
        <td>{name}</td>
        <td>
          <button type="button" style={{backgroundColor: "#4b8a3e"}} onClick={() => signIn(name, team, token)}>
            {status}
          </button>
        </td>
      </tr>
    );
  } else if (status == "Sign Out") {
    return (
      <tr>
        <td>{name}</td>
        <td>
          <button type="button" style={{backgrounColor: "red"}} onClick={() => signOut(name, team, token)}>
            {status}
          </button>
        </td>
      </tr>
    );
  }
  
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
