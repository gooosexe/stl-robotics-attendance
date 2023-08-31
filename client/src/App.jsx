import React from "react";
import "./App.css";
import AuthenticateUser from "./AuthenticateUser";

function App() {
  const [data, setData] = React.useState(null);

  const serverIpAddress = window.location.hostname;

  React.useEffect(() => {
    fetch(`http://${serverIpAddress}:3001/api`)
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  console.log(data);

  return (
    <>
      <AuthenticateUser />
    </>
  );
}

export default App;
