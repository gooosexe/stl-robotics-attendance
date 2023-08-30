import "./App.css";
import "./index.css";
import React from "react";
import {Link} from "react-router-dom";

/**
 * Updates the memberStatuses dictionary at a set interval
 */
async function updateStatuses(token, setStatusList) {
  await fetch("/allStatus", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .then((data) => {
      setStatusList(data.statusDict);
      console.log(`Done updating statuses`);
    });
}

/**
 * Returns the status of members from the memberStatuses dictionary
 */
function getMemberStatus(member, statusList) {
  return statusList[member];
}

async function signOut(token, member){
  console.log(`Signing out ${member}...`);
  await fetch("/signOut", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({member: member})
  })
    .then((res) => res.json())
    .then((data) => {
      
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    }
  );
}

async function signIn(token, member) {
  console.log(`Signing in ${member}...`); 
  await fetch("/signIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({member: member})
  })
    .then((res) => res.json())
    .then((data) => {
      
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    }
  );
}    

/**
 * Creates/updates a table entry for a member
 */
function UpdateMemberEntry(props) {
  const { name, team, token, statusList, setStatusList } = props;
  const status = statusList[name];
  const [isSigningIn, setIsSigningIn] = React.useState(false);

  let buttonText, buttonTextColor, buttonColor, buttonFunction;

  switch (status) {
    case -1: // loading
      console.log("Loading...");
      buttonText = "Loading...";
      buttonTextColor = "#000000"
      buttonColor = "#ffcc00";
      buttonFunction = () => {alert("Please wait for the page to load.")};
      break;
    case 0: // signed out
      buttonText = "Sign in";
      buttonTextColor = "#ffffff";
      buttonColor = "#339933";
      buttonFunction = () => {
        setIsSigningIn(true);
        signIn(token, name)
           .then(() => {updateStatuses(token, setStatusList); setIsSigningIn(false)}) 
           .finally(() => console.log("Done signing in " + name + "\n")); 
      };
      break;
    case 1: // signed in
      buttonText = "Sign out";
      buttonTextColor = "#ffffff";
      buttonColor = "#cc0000";
      buttonFunction = () => {
        setIsSigningIn(true);
        signOut(token, name)
            .then(() => {updateStatuses(token, setStatusList); setIsSigningIn(false)})
            .finally(() => console.log("Done signing out " + name + "\n"));
      };
      break;
    default: // bruh
      buttonText = "No State";
      break;
  }

  return (
    <tr>
      <td>{name}</td>
      <td>
        <button type="button" style={{ backgroundColor: buttonColor, color: buttonTextColor }} onClick={buttonFunction} disabled={isSigningIn}>
          {buttonText}
        </button>
      </td>
    </tr>
  );
}

/**
 * Retrieves and sorts members into their respective teams.
 */
function GetMemberList(props) {
  const { memberList, token } = props;
  const [statusList, setStatusList] = React.useState({});

  // This is how update statuses is called once when mounting the component
  React.useEffect(() => {
    console.log("Updating statuses...");
    updateStatuses(token, setStatusList);

    const intervalId = setInterval(() => {
      console.log("Updating statuses...");
      updateStatuses(token, setStatusList);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [token]);

  // If memberList is not an array, return an error message
  if (!Array.isArray(memberList)) {
    return <p>Member list is not available.</p>;
  }

  // Define team arrays
  let xTeam = [];
  let yTeam = [];
  let zTeam = [];
  let gTeam = [];
  let tTeam = [];
  let sTeam = [];

  // Sort members into their respective teams
  memberList.forEach((member) => {
    switch (member.team) {
      case "T":
        tTeam.push(<UpdateMemberEntry team={member.team} name={member.name} token={token} statusList={statusList} setStatusList={setStatusList}/>);
        break;
      case "S":
        sTeam.push(<UpdateMemberEntry team={member.team} name={member.name} token={token} statusList={statusList} setStatusList={setStatusList}/>);
        break;
      case "X":
        xTeam.push(<UpdateMemberEntry team={member.team} name={member.name} token={token} statusList={statusList} setStatusList={setStatusList}/>);
        break;
      case "Y":
        yTeam.push(<UpdateMemberEntry team={member.team} name={member.name} token={token} statusList={statusList} setStatusList={setStatusList}/>);
        break;
      case "Z":
        zTeam.push(<UpdateMemberEntry team={member.team} name={member.name} token={token} statusList={statusList} setStatusList={setStatusList}/>);
        break;
      case "G":
        gTeam.push(<UpdateMemberEntry team={member.team} name={member.name} token={token} statusList={statusList} setStatusList={setStatusList}/>);
        break;
      default:
        console.log(`Error: ${member.name} ${member.team} is not a valid team.`);
        break;
    }
  });

  // Return the html of the teams and their members
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
