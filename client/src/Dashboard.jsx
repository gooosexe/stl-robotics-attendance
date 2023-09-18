import React, { useState } from "react";
import "./styles/App.css";
import "./styles/index.css";
import "./styles/Dashboard.css";

// const serverIpAddress = window.location.hostname;
const serverIpAddress = "api2.robotics-attendance.tech"

function LastMeeting(props) {
  const { name, team, permission, token } = props;
  const [lastMeeting, setLastMeeting] = useState("");
  const [numberOfMeetings, setNumberOfMeetings] = useState(0);
  const [meetingsLastMonth, setMeetingsLastMonth] = useState(0);

  React.useEffect(() => {
    fetch(`https://${serverIpAddress}:3001/dashboardData`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLastMeeting(data.lastMeetingAttended);
        setNumberOfMeetings(data.numberOfMeetingsAttended);
        setMeetingsLastMonth(data.numberOfMeetingsLastMonth);
        // let roundedHours = Math.round(data.totalHours * 100) / 100;
        // setTotalHours(roundedHours);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  });

  return (
    <table className="dashboard">
      <tr>
        <td>Last meeting attended</td>
        <td>{lastMeeting}</td>
      </tr>
      <tr>
        <td>Meetings attended last month</td>
        <td>{meetingsLastMonth}</td>
      </tr>
    </table>
  );
}

function Dashboard(props) {
  const { name, team, permission, token } = props;
  return (
    <div style= {{backgroundColor: "#202020"}}> 
      <h1 style={{color: "#ffc400"}}>Dashboard for {name}</h1>
      <LastMeeting
        name={name}
        team={team}
        permission={permission}
        token={token}
      />
    </div>
  );
}

export default Dashboard;
