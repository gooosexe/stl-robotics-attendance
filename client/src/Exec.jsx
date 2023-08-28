import "./App.css";
import "./index.css";
import React from "react";

// for changing the sign in/out button
const changeButtonStatus = (name, team) => {
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
  const { memberList } = props;
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
        tTeam.push(<CreateMemberEntry team={member.team} name={member.name} />);
        break;
      case "S":
        sTeam.push(<CreateMemberEntry team={member.team} name={member.name} />);
        break;
      case "X":
        xTeam.push(<CreateMemberEntry team={member.team} name={member.name} />);
        break;
      case "Y":
        yTeam.push(<CreateMemberEntry team={member.team} name={member.name} />);
        break;
      case "Z":
        zTeam.push(<CreateMemberEntry team={member.team} name={member.name}/>);
        break;
      case "G":
        gTeam.push(<CreateMemberEntry team={member.team} name={member.name}/>);
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
      <GetMemberList memberList={memberList} />
    </div>
  );
}

export default Exec;
