import React from "react";
import "./styles/App.css";
import AuthenticateUser from "./AuthenticateUser";

function App() {
  const [data, setData] = React.useState(null);

  // var serverIpAddress = "http://api4.robotics-attendance.tech";
  const serverIpAddress = "http://robotics.classroom.ycdsb.ca"; 

// Fix the nocors issue by adding the following to the fetch request:
  React.useEffect(() => {
    fetch(`${serverIpAddress}/api`, {

    }) 
      .then((res) => res.json())
      .then((data) => setData(data.message));
    });

  console.log(data);

  return (
    <>
      <AuthenticateUser />
    </>
  );
}

export default App;
