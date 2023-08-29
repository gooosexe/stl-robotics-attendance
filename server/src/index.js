const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const PORT = 3001;

const app = express();

app.use(cors());
app.use(express.json());

function returnMemberList(username, team, permission) {
  // If executive access everyone
  // If captain only access team
  // If member only access self
  console.log(username, team, permission);
  let fs = require("fs");
  let rawdata = fs.readFileSync("./src/users.csv");
  let users = rawdata.toString().split("\n");
  let memberList = []; // list of members to return

  for (let user of users) {
    const [userTeam, name, userPermission, userUsername, userPassword] = user.split(",");
    if (
      permission == "exec" ||
      (permission == "captain" && team == userTeam) ||
      (permission == "member" && username == userUsername)
    ) {
      // pushes a member json object to the memberList
      memberList.push({
        name: name,
        team: userTeam,
        permission: userPermission,
        username: userUsername,
      });
    }
  }
  return memberList;
}

function isValidUser(providedUsername, providedPassword) {
  // Open comma seperated values file
  let fs = require("fs");
  let rawdata = fs.readFileSync("./src/users.csv");
  let users = rawdata.toString().split("\n");
  for (let user of users) {
    const [team, name, permission, username, password] = user.split(",");
    if (providedUsername == username.trim() && providedPassword == password.trim()) {
      return [true, permission, name, team];
    }
  }
  return [false, "none"];
}

/**
 * This function will check if the user is authenticated, will stop the request if not valid 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function authenticate(req, res, next) {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secretKey");
    if (decoded) {
      next();
    } else {
      res.json({ error: "invalid" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

/**
 * This function will return the status of the user 
 * Either signedIn or signedOut
 */
app.post("/status", authenticate, (req, res) => {
  const {name} = req.body; // Get the name of the user that we want the status of
  // Open timecards.csv file
  let fs = require("fs");
  let rawdata = fs.readFileSync("./src/timecards.csv");
  let timecards = rawdata.toString().split("\n");

  // Check if the user has a timecard
  for (let timecard of timecards) {
    const [user, timeIn, timeOut, day, signedInBy, signedOutBy] = timecard.split(",");
    if (user == name) {
      // Check if the timecard has an ending 
      if (timeOut == "") {
        // If the timecard has no ending, the user is signed in
        res.json({status: "signedIn"});
      } else {
        // If the timecard has an ending, the user is signed out
        res.json({status: "signedOut"});
      }
    }
  }
  // If the user has no timecard, they are not signed in
  res.json({status: "signedOut"});  
});

/**
 * This function will return the statuses of everyone in a dictionary format 
 */
app.get("/allStatus", authenticate, (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  // Decode to get the team and permission
  const decoded = jwt.verify(token, "secretKey");
  const {team, permission} = decoded;

  // Get the list of members based on the team and permission
  const memberList = returnMemberList("", team, permission);
  let fs = require("fs");
  let rawdata = fs.readFileSync("./src/timecards.csv");
  let timecards = rawdata.toString().split("\n");
  let statusDict = {}; // Dictionary of statuses to return

  // Loop through the timecards and check if the user is signed in or signed out
  for (let member of memberList) {
    for (let timecard of timecards) {
      const [user, timeIn, timeOut, day, signedInBy, signedOutBy] = timecard.split(",");
      if (user == member.name) {
        // Check if the timecard has an ending
        if (timeOut == "") {
          // If the timecard has no ending, the user is signed in
          statusDict[member.name] = 1;
        } else {
          // If the timecard has an ending, the user is signed out
          statusDict[member.name] = 0;
        }
      }
    }
    // If the user has no timecard, they are not signed in
    if (statusDict[member.name] == undefined) {
      statusDict[member.name] = 0;
    }
  }

  // Return the dictionary of statuses
  console.log("Returning status dictionary");
  res.json({statusDict: statusDict});
});

app.get("/protected", authenticate, (req, res) => {
  res.json({ message: "You are authorized" });
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const [isValid, permission, name, team] = isValidUser(username, password);

  if (isValid) {
    const memberList = returnMemberList(username, team, permission);
    console.log("Returning member list of size " + memberList.length); 
    const token = jwt.sign(
      {
        username: username,
        permission: permission,
        name: name,
        team: team,
        memberList: memberList
      },
      "secretKey"
    );
    // return token and list
    res.json({ token: token, memberList: memberList });
  } else {
    res.json({ token: "invalid" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
