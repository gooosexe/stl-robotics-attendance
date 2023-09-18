import React from "react";
import "./styles/App.css";
import AuthenticateUser from "./AuthenticateUser";

function App() {
  const [data, setData] = React.useState(null);

  const serverIpAddress = "api2.robotics-attendance.tech";

  React.useEffect(() => {
    fetch(`http://${serverIpAddress}/api`)
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
