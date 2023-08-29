import "./App.css";
import "./index.css";
import React from "react";

/**
 * Updates the memberStatuses dictionary at a set interval
 */
async function updateStatuses(token){
  let memberStatuses = {};
  await fetch("/allStatus", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }})
    .then((res) => res.json())
    .then((data) => {
      console.log(`Data from server: ${data.statusDict}`);
      var memberStatuses = data.statusDict;
    });
    console.log("try ", memberStatuses); 
    return memberStatuses;
}

/**
 * Returns the status of members from the memberStatuses dictionary
 */
function getMemberStatus(member, statusList){
  return statusList[member];
}

/**
 * Creates/updates a table entry for a member
 */
function UpdateMemberEntry(props) {
  const { team, name, token, statusList} = props;

  const status = getMemberStatus(name, statusList);  

  let buttonText = "Loading..."; 
  let buttonTextColor = "#000000";
  let buttonColor = "#ffcc00";

  
  switch (status) {
    case -1: // loading
      buttonText = "Loading...";
      buttonTextColor = "#000000"
      buttonColor = "#ffcc00";
      break;
    case 0: // signed out
      buttonText = "Sign in";
      buttonTextColor = "#ffffff";
      buttonColor = "#339933";
      break;
    case 1: // signed in
      buttonText = "Sign out";
      buttonTextColor = "#ffffff";
      buttonColor = "#cc0000";
      break;
    default: // bruh
      buttonText = "No State";
      break;
  }

  return (
    <tr>
      <td>{name}</td>
      <td>
        <button type="button" style={{ backgroundColor: buttonColor, color: buttonTextColor }}>
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

  if (!Array.isArray(memberList)) {
    return <p>Member list is not available.</p>;
  }

  let xTeam = [];
  let yTeam = [];
  let zTeam = [];
  let gTeam = [];
  let tTeam = [];
  let sTeam = [];

  // Update statuses
  let statusList = updateStatuses(token);
  console.log(statusList); 

  memberList.forEach((member) => {
    switch (member.team) {
      case "T":
        tTeam.push(<UpdateMemberEntry team={member.team} name={member.name} token={token} statusList={statusList}/>);
        break;
      case "S":
        sTeam.push(<UpdateMemberEntry team={member.team} name={member.name} token={token} statusList={statusList}/>);
        break;
      case "X":
        xTeam.push(<UpdateMemberEntry team={member.team} name={member.name} token={token} statusList={statusList}/>);
        break;
      case "Y":
        yTeam.push(<UpdateMemberEntry team={member.team} name={member.name} token={token} statusList={statusList}/>);
        break;
      case "Z":
        zTeam.push(<UpdateMemberEntry team={member.team} name={member.name} token={token} statusList={statusList}/>);
        break;
      case "G":
        gTeam.push(<UpdateMemberEntry team={member.team} name={member.name} token={token} statusList={statusList}/>);
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
