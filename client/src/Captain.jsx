import "./App.css";
import "./index.css";
import React from "react";

// for changing the sign in/out button
function changeButtonStatus(name, team) {
  // changes the colour
  console.log(`${name} ${team}`);
}

function CreateMemberEntry(props) {
  const { team, name } = props;
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
  const { memberList, captainTeam } = props;
  if (!Array.isArray(memberList)) {
    return <p>Member list is not available.</p>;
  }

  // Sort memberList by team
  memberList.sort((a, b) => {
    if (a.team < b.team) {
      return -1;
    }
    if (a.team > b.team) {
      return 1;
    }
    return 0;
  });

  let list = [];
  memberList.forEach((member) => {
    switch (member.team) {
      case "T":
        list.push(
          <CreateMemberEntry team={member.team} name={member.name} />
        );
        break;
      case "S":
        list.push(
          <CreateMemberEntry team={member.team} name={member.name} />
        );
        break;
      case "X":
        list.push(
          <CreateMemberEntry team={member.team} name={member.name} />
        );
        break;
      case "Y":
        list.push(
          <CreateMemberEntry team={member.team} name={member.name} />
        );
        break;
      case "Z":
        list.push(
          <CreateMemberEntry team={member.team} name={member.name} />
      );
      break;
      case "G":
        list.push(
          <CreateMemberEntry team={member.team} name={member.name} />
        );
        break;
      default:
        console.log(`Error: ${member.name} ${member.team} is not a valid team.`);
    }
  });

  let classNameVar = "";
  switch (captainTeam) {
    case "T":
      classNameVar = "tTeam";
      break;
    case "S":
      classNameVar = "sTeam";
      break;
    case "X":
      classNameVar = "xTeam";
      break;
    case "Y":
      classNameVar = "yTeam";
      break;
    case "Z":
      classNameVar = "zTeam";
      break;
    case "G":
      classNameVar = "gTeam";
      break;
    default:
      console.log(`Error: ${captainTeam} is not a valid team.`);
  }


  return (
    <div className="captainTable">
      <table id="memberTable" >
        <tr>
          <th>Name</th>
          <th>Sign In / Out</th>
        </tr>
        {list}
      </table>
    </div>
  );
}

function Captain(props) {
  const { name, team, permission, token, memberList } = props;
  return (
    <>
      <h1>
        Welcome <span style={{ color: "yellow" }}>{name}</span> from <span style={{ color: "yellow" }}>82855{team}</span>
      </h1>
      <GetMemberList memberList={memberList} captainTeam={team}/>
    </>
  );
}

export default Captain;
