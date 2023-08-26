import "./App.css";
import "./index.css";
import React from "react";

// for changing the sign in/out button
const changeButtonStatus = (name, team) => {
  console.log(`${name} ${team}`);
}

function GetMemberList(props) {
  const { memberList } = props;
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
  for (let i = 0; i < memberList.length; i++) {
    let name = memberList[i].name;
    let team = memberList[i].team;

    switch (team) {
      case "T":
        list.push(
          <tr>
            <td>{team}</td>
            <td>{name}</td>
            <td>
              <button type="button" onClick={() => changeButtonStatus(name, team)}>
                Sign In / Out
              </button>
            </td>
          </tr>
        );
        break;
      case "S":
        list.push(
          <tr>
            <td>{team}</td>
            <td>{name}</td>
            <td>
              <button type="button" onClick={() => changeButtonStatus(name, team)}>
                Sign In / Out
              </button>
            </td>
          </tr>
        );
        break;
      case "X":
        list.push(
          <tr>
            <td>{team}</td>
            <td>{name}</td>
            <td>
              <button type="button" onClick={() => changeButtonStatus(name, team)}>
                Sign In / Out
              </button>
            </td>
          </tr>
        );
        break;
      case "Y":
        list.push(
          <tr>
            <td>{team}</td>
            <td>{name}</td>
            <td>
              <button type="button" onClick={() => changeButtonStatus(name, team)}>
                Sign In / Out
              </button>
            </td>
          </tr>
        );
        break;
      case "Z":
        list.push(
          <tr>
            <td>{team}</td>
            <td>{name}</td>
            <td>
              <button type="button" onClick={() => changeButtonStatus(name, team)}>
                Sign In / Out
              </button>
            </td>
          </tr>
      );
      break;
      case "G":
        list.push(
          <tr>
            <td>{team}</td>
            <td>{name}</td>
            <td>
              <button type="button" onClick={() => changeButtonStatus(name, team)}>
                Sign In / Out
              </button>
            </td>
          </tr>
        );
        break;
      default:
        console.log(`Error: ${name} ${team} is not a valid team.`);
    }

    // list.push(<>
    //     <p>{name} {team}  <button type="submit" onClick={() => changeButtonStatus(name, team)}>Sign In / Out</button></p>

    //     {/*add a space between this person and the next*/}

    // </>)
  }

  console.log(list);

  return (
    <table>
      <tr>
        <th>Team</th>
        <th>Name</th>
        <th>Sign In / Out</th>
      </tr>
      {list}
    </table>
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
