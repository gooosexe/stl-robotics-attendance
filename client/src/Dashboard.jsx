import React, { useState } from "react";
import "./App.css";
import "./index.css";

function LastMeeting(props) {
  const { name, team, permission, token } = props;
  const [lastMeeting, setLastMeeting] = useState("");
  const [numberOfMeetings, setNumberOfMeetings] = useState(0);
  const [meetingsLastMonth, setMeetingsLastMonth] = useState(0);
  const [totalHoursLastMonth, setTotalHoursLastMonth] = useState(0);

  React.useEffect(() => {
    fetch("/dashboardData", {
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
        setTotalHoursLastMonth(data.totalHoursLastMonth);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  });

  return (
    <>
      <h2> Last Meeting Attended: {lastMeeting} </h2>
      <h2> Meetings attended: {numberOfMeetings} </h2>
      <h2> Meetings attended last month: {meetingsLastMonth} </h2>
      <h2> Total hours last month: {totalHoursLastMonth} </h2>
    </>
  );
}

function Dashboard(props) {
  const { name, team, permission, token } = props;
  return (
    <div className="dashboard">
      <h1 className="dashboard" style={{ color: "#fcba03"}}>
        Dashboard for {name}
      </h1>
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
