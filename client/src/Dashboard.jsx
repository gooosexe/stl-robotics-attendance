import React, { useState, useEffect } from "react";
import jwt from "jwt-decode";
import "./App.css";
import "./index.css";
import Logo from "./roboticsLog.png";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function LastMeeting(props) {
    const { name, team, permission, token } = props;
    const [lastMeeting, setLastMeeting] = useState("");
    const [numberOfMeetings, setNumberOfMeetings] = useState(0);
    const [meetingsLastMonth, setMeetingsLastMonth] = useState(0);

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
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
            });
    }, []);


    return (
        <>
            <h2> Last Meeting Attended: {lastMeeting} </h2>
            <h2> Number of Meetings Attended: {numberOfMeetings} </h2>
            <h2> Number of Meetings Attended Last Month: {meetingsLastMonth} </h2>
        </>
    );
}

function Dashboard(props) {
    const { name, team, permission, token } = props;
    return (
        <>
            <h1 style={{ color: "#fcba03", marginTop: "50px"}}>Dashboard</h1>

            <LastMeeting name={name} team={team} permission={permission} token={token} />

        </>
    );
}

export default Dashboard;