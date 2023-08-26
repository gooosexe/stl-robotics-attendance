import "./App.css";
import "./index.css";
import React from "react";

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

    if (team === "T") {
      list.push(
        <>
          <p style={{ color: "#5b82c2" }}>
            {name} {team}{" "}
            <button
              type="submit"
              onClick={() => console.log(name + " " + team)}
            >
              Sign In / Out
            </button>
          </p>
        </>
      );
    } else if (team === "S") {
      list.push(
        <>
          <p style={{ color: "#c25b5b" }}>
            {name} {team}{" "}
            <button
              type="submit"
              onClick={() => console.log(name + " " + team)}
            >
              Sign In / Out
            </button>
          </p>
        </>
      );
    } else if (team === "X") {
      list.push(
        <>
          <p style={{ color: "#c2b05b" }}>
            {name} {team}{" "}
            <button
              type="submit"
              onClick={() => console.log(name + " " + team)}
            >
              Sign In / Out
            </button>
          </p>
        </>
      );
    } else if (team === "Y") {
      list.push(
        <>
          <p style={{ color: "#5bc2b0" }}>
            {name} {team}{" "}
            <button
              type="submit"
              onClick={() => console.log(name + " " + team)}
            >
              Sign In / Out
            </button>
          </p>
        </>
      );
    } else if (team === "Z") {
      list.push(
        <>
          <p style={{ color: "#c25bb0" }}>
            {name} {team}{" "}
            <button
              type="submit"
              onClick={() => console.log(name + " " + team)}
            >
              Sign In / Out
            </button>
          </p>
        </>
      );
    } else if (team === "G") {
      list.push(
        <>
          <p style={{ color: "#5bc2b0" }}>
            {name} {team}{" "}
            <button
              type="submit"
              onClick={() => console.log(name + " " + team)}
            >
              Sign In / Out
            </button>
          </p>
        </>
      );
    }

    // list.push(<>
    //     <p>{name} {team}  <button type="submit" onClick={() => console.log(name + " " + team)}>Sign In / Out</button></p>

    //     {/*add a space between this person and the next*/}

    // </>)
  }
  return <ul>{list}</ul>;
}

function Captain(props) {
  const { name, team, permission, token, memberList } = props;
  return (
    <>
      <>
        <h1>
          Welcome <a style={{ color: "yellow" }}>{name}</a> from{" "}
          <a style={{ color: "yellow" }}>82855{team}</a>
        </h1>
        <GetMemberList memberList={memberList} />
      </>
    </>
  );
}

export default Captain;
