import "./App.css";
import "./index.css";
import React from "react";

function changeButtonStatus(name, team) {
  // changes the colour
  console.log(`${name} ${team}`);
}

async function updateStatuses(token, setStatusList) {
  await fetch("/allStatus", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .then((data) => {
      setStatusList(data.statusDict);
      console.log("Statuses: " + JSON.stringify(data.statusDict)); 
      console.log(`Done updating statuses`);
    });
}

function getStatus(member, statusList) {
  return statusList[member];
}

/**
 * This functions calls the /signOut to sign out a member
 * @param {This is the jwt token} token 
 * @param {This is the name of the member} member 
 */
async function signOut(token, member){
  console.log(`Signing out ${member}...`);
  await fetch("/signOut", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({member: member})
  })
    .then((res) => res.json())
    .then((data) => {
      
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    }
  );
}

async function signIn(token, member) {
  console.log(`Signing in ${member}...`); 
  await fetch("/signIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({member: member})
  })
    .then((res) => res.json())
    .then((data) => {
      
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    }
  );
}

function Member(props) {
  const { team, name, permission, token } = props;
  const [statusList, setStatusList] = React.useState({});
  const status = statusList[name];
  const [isSigningIn, setIsSigningIn] = React.useState(false);
  let buttonText, buttonTextColor, buttonColor, buttonFunction;

  React.useEffect(() => {
    updateStatuses(token, setStatusList);
    const intervalId = setInterval(() => {
      updateStatuses(token, setStatusList);
      console.log("Statuses: " + JSON.stringify(statusList)); 
    }
    , 5000);
    return () => clearInterval(intervalId);
  }, [token]);

  switch (status) {
    case -1: // loading
      console.log("Loading...");
      buttonText = "Loading...";
      buttonTextColor = "#000000"
      buttonColor = "#ffcc00";
      buttonFunction = () => { alert("Please wait for the page to load.") };
      break;
    case 0: // signed out
      buttonText = "Sign in";
      buttonTextColor = "#ffffff";
      buttonColor = "#339933";
      buttonFunction = () => {
        setIsSigningIn(true);
        signIn(token, name)
          .then(() => { updateStatuses(token, setStatusList); setIsSigningIn(false) })
          .finally(() => console.log("Done signing in " + name + "\n"));
      };
      break;
    case 1: // signed in
      buttonText = "Sign out";
      buttonTextColor = "#ffffff";
      buttonColor = "#cc0000";
      buttonFunction = () => {
        setIsSigningIn(true);
        signOut(token, name)
          .then(() => { updateStatuses(token, setStatusList); setIsSigningIn(false) })
          .finally(() => console.log("Done signing out " + name + "\n"));
      };
      break;
    default: // bruh
      buttonText = "No State";
      break;
  }

  return (
    <tr>
      <td>{name}</td>
      <td>
        <button type="button" style={{ backgroundColor: buttonColor, color: buttonTextColor }} onClick={buttonFunction} disabled={isSigningIn}>
          {buttonText}
        </button>
      </td>
    </tr>
  );
}

export default Member;
