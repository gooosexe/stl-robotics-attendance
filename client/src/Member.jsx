import "./styles/App.css";
import "./styles/index.css";
import React from "react";
// const serverIpAddress = window.location.hostname;
const serverIpAddress = "api2.robotics-attendance.tech"; 
/**
 *
 * @param {The token for the jwt authorization on the servberside} token
 * @param {The set react component to set the status listThis function ha} setStatusList
 */
async function updateStatuses(token, setStatusList) {
  try {
    await fetch(`http://${serverIpAddress}/allStatus`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStatusList(data.statusDict);
      });
  } catch (err) {
    console.log(`Error: ${err}`);
    alert(
      "Unable to communicate with server. Please try again later or contact an executive."
    );
  }
}

/**
 * This functions calls the /signOut to sign out a member
 * @param {This is the jwt token} token
 * @param {This is the name of the member} member
 */
async function signOut(token, member) {
  console.log(`Signing out ${member}...`);
  try {
    await fetch(`http://${serverIpAddress}/signOut`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ member: member }),
    })
      .then((res) => res.json())
      .then((data) => {})
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  } catch (err) {
    console.log(`Error: ${err}`);
    alert(
      "Unable to communicate with server. Please try again later or contact an executive."
    );
  }
}

/**
 * This function calls the /signin to a signout a member
 * @param {This is the jwt token} token
 * @param {This is the name of the member} member
 */
async function signIn(token, member) {
  console.log(`Signing in ${member}...`);
  await fetch(`http://${serverIpAddress}/signIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ member: member }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "TIME ERROR") {
        alert("You cannot sign in before 2:30PM");
      }
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
}

/**
 * This function is the react component for the member
 * @param {This is the props for the member, expecting team, name, permission and token} props
 * @returns The react component for the member
 */
function Member(props) {
  const { team, name, permission, token } = props;
  const [statusList, setStatusList] = React.useState({});
  const status = statusList[name];
  const [isSigningIn, setIsSigningIn] = React.useState(false);
  let buttonText, buttonTextColor, buttonColor, buttonFunction;

  // Sets an interval to update the statuses every 5 seconds
  React.useEffect(() => {
    updateStatuses(token, setStatusList);
    const intervalId = setInterval(() => {
      updateStatuses(token, setStatusList);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [token]);

  switch (status) {
    case -1: // loading
      console.log("Loading...");
      buttonText = "Loading...";
      buttonTextColor = "#000000";
      buttonColor = "#ffc400";
      buttonFunction = () => {
        alert("Please wait for the page to load.");
      };
      break;
    case 0: // signed out
      buttonText = "Sign in";
      buttonTextColor = "#ffffff";
      buttonColor = "#339933";
      buttonFunction = () => {
        setIsSigningIn(true);
        signIn(token, name)
          .then(() => {
            updateStatuses(token, setStatusList);
            setIsSigningIn(false);
          })
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
          .then(() => {
            updateStatuses(token, setStatusList);
            setIsSigningIn(false);
          })
          .finally(() => console.log("Done signing out " + name + "\n"));
      };
      break;
    default:
      buttonText = "Loading . . .";
      buttonTextColor = "#000000";
      buttonColor = "#ffc400";
      break;
  }

  // Write an if statement that

  return (
    <>
      <h1>
        Welcome <span style={{ color: "#ffc400" }}>{name}</span> from{" "}
        <span style={{ color: "#ffc400"}}>82855{team}</span>
      </h1>
      <button
        type="button"
        className="big-button"
        style={{ backgroundColor: buttonColor, color: buttonTextColor }}
        onClick={buttonFunction}
        disabled={isSigningIn}
      >
        {buttonText}
      </button>
    </>
  );
}

export default Member;
