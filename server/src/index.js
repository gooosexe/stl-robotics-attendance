const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const https = require("https");
const fs = require("fs");

const PORT = 3001;

const app = express();

app.use(cors());
app.use(express.json());

function returnMemberList(username, team, permission) {
  // If executive access everyone
  // If captain only access team
  // If member only access self
  let fs = require("fs");
  let rawdata = fs.readFileSync("./src/users.csv");
  let users = rawdata.toString().split("\n");
  let memberList = []; // list of members to return

  for (let user of users) {
    const [userTeam, name, userPermission, userUsername, userPassword] =
      user.split(",");
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
    if (
      providedUsername == username.trim() &&
      providedPassword == password.trim()
    ) {
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

app.get("/dashboardData", authenticate, (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "secretKey");
  const { username, permission } = decoded;
  const name = decoded.name;
  const team = decoded.team;

  // GET THE LAST MEETING ATTENDED
  // Sift through timecards to find the last meeting attended
  let fs = require("fs");
  let rawdata = fs.readFileSync("./src/timecards.csv");
  let timecards = rawdata.toString().split("\n");
  let lastMeetingAttended = "None"; // Last meeting attended to return
  let numberOfMeetingsAttended = 0; // Number of meetings attended to return, we make a set and push the date to it to get the number of unique meetings attended
  let meetingsAttended = new Set(); // Set of meetings attended to return
  let meetingsLastMonth = 0; // Number of meetings attended last month to return
  let totalHours = 0; // Total hours attended last month to return

  // Loop through the timecards and check if the user is signed in or signed out
  for (let timecard of timecards) {
    const [user, timeIn, timeOut, day, signedInBy, signedOutBy] =
      timecard.split(",");
    if (user == name) {
      meetingsAttended.add(day);

      // Calculate the total hours
      if (timeOut != "") {
        const [hoursIn, minutesIn, secondsIn] = timeIn.split(":");
        const [hoursOut, minutesOut, secondsOut] = timeOut.split(":");
        const hours = parseInt(hoursOut) - parseInt(hoursIn);
        const minutes = parseInt(minutesOut) - parseInt(minutesIn);
        totalHours += hours + minutes / 60;
      }
    }
    if (user == name && timeOut != "") {
      lastMeetingAttended = day;
    }
  }

  // Iterate through meetingsAttended to see which ones fall within the last month
  for (let meeting of meetingsAttended) {
    const [month, day, year] = meeting.split("/");
    const meetingDate = new Date(year, month - 1, day);
    const today = new Date();
    const oneMonthAgo = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    );
    if (meetingDate > oneMonthAgo) {
      meetingsLastMonth++;
    }
  }

  // Get the number of meetings attended as a total
  numberOfMeetingsAttended = meetingsAttended.size;

  // Return the last meeting attended
  res.json({
    lastMeetingAttended: lastMeetingAttended,
    numberOfMeetingsAttended: numberOfMeetingsAttended,
    numberOfMeetingsLastMonth: meetingsLastMonth,
    totalHours: totalHours,
  });
});

app.post("/signIn", authenticate, (req, res) => {
  const name = req.body.member;

  // Get who it was signed by through the token
  let token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "secretKey");
  const signedInBy = decoded.name;
  process.stdout.write(
    "Attempting: Sign in " + name + " by " + signedInBy + "  - - -  "
  );
  res.json({ message: "Signed in " + name + " by " + signedInBy });

  // Open timecards.csv file
  let fs = require("fs");
  let rawdata = fs.readFileSync("./src/timecards.csv");
  let timecards = rawdata.toString().split("\n");
  let found = false; // If the user has a timecard
  let newTimecards = []; // New timecards to write to the file

  // Loop through the timecards and check if the user has a timecard
  for (let timecard of timecards) {
    const [user, timeIn, timeOut, day, signedInBy, signedOutBy] =
      timecard.split(",");
    if (user == name && timeOut == "") {
      found = true;
      newTimecards.push(
        [user, timeIn, timeOut, day, signedInBy, signedOutBy].join(",")
      );
    } else {
      newTimecards.push(timecard);
    }
  }

  // The only case you add a new time card is if the user does not have one
  if (!found) {
    newTimecards.push(
      [
        name,
        new Date().toLocaleTimeString(),
        "",
        new Date().toLocaleDateString(),
        signedInBy,
        "",
      ].join(",")
    );
  }

  // Write the new timecards to the file
  fs.writeFileSync("./src/timecards.csv", newTimecards.join("\n"));

  console.log("Success: Signed in " + name + " by " + signedInBy);
});

app.post("/signOut", authenticate, (req, res) => {
  const name = req.body.member;
  // Get who it was signed by through the token
  let token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "secretKey");
  const signedOutBy = decoded.name;

  process.stdout.write(
    "Attempting: Sign in " + name + " by " + signedOutBy + "  - - -  "
  );
  res.json({ message: "Signed out " + name + " by " + signedOutBy });

  // Open timecards.csv file
  let fs = require("fs");
  let rawdata = fs.readFileSync("./src/timecards.csv");
  let timecards = rawdata.toString().split("\n");
  let found = false; // If the user has a timecard
  let newTimecards = []; // New timecards to write to the file

  // Loop through the timecards and check if the user has a timecard
  for (let timecard of timecards) {
    const [user, timeIn, timeOut, day, signedInBy, oldSignedOutBy] =
      timecard.split(",");
    if (user == name && timeOut == "" && found == false) {
      found = true;
      newTimecards.push(
        [
          user,
          timeIn,
          new Date().toLocaleTimeString(),
          day,
          signedInBy,
          signedOutBy,
        ].join(",")
      );
    } else {
      newTimecards.push(timecard);
    }
  }

  // If the user has no time card that means they were not signed in so do nothing
  if (!found) {
    return;
  }

  // Write the new timecards to the file
  fs.writeFileSync("./src/timecards.csv", newTimecards.join("\n"));

  console.log("Success: Signed out " + name + " by " + signedOutBy);
});

/**
 * This function will return the statuses of everyone in a dictionary format
 */
app.get("/allStatus", authenticate, (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  // Decode to get the team and permission
  const decoded = jwt.verify(token, "secretKey");
  const { team, permission } = decoded;
  const username = decoded.username;
  const name = decoded.name;

  // Get the list of members based on the team and permission
  const memberList = returnMemberList(username, team, permission);
  let fs = require("fs");
  let rawdata = fs.readFileSync("./src/timecards.csv");
  let timecards = rawdata.toString().split("\n");
  // Slice to only use the last 1000 timecards
  timecards = timecards.slice(Math.max(timecards.length - 1000, 0));

  let statusDict = {}; // Dictionary of statuses to return

  console.log(
    name +
      " on " +
      team +
      " with permission of " +
      permission +
      " requested statuses"
  );

  // Loop through the timecards and check if the user is signed in or signed out
  for (let member of memberList) {
    statusDict[member.name] = 0;
    for (let timecard of timecards) {
      const [user, timeIn, timeOut, day, signedInBy, signedOutBy] =
        timecard.split(",");
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
  res.json({ statusDict: statusDict });
});

// This function just tests that the server is running
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// This function will return the list of members based on the team and permission
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const [isValid, permission, name, team] = isValidUser(username, password);

  // Get ip address without using .connection
  const ip = req.headers["x-forwarded-for"] || req.ip;
  // Get device type
  const device = req.headers["user-agent"];

  console.log(
    "Login attempt from " +
      ip +
      " with username " +
      username +
      " on device " +
      device
  );

  if (isValid) {
    const memberList = returnMemberList(username, team, permission);
    console.log("Login successful for " + username);
    const token = jwt.sign(
      {
        username: username,
        permission: permission,
        name: name,
        team: team,
        memberList: memberList,
      },
      "secretKey"
    );
    // return token and list
    res.json({ token: token, memberList: memberList });
  } else {
    res.json({ token: "invalid" });
  }
});

// This function signs out members automatically at 4:30 pm if they are not signed out, runs at a 5 minute interval
setInterval(function () {
  // Open timecards.csv file
  let fs = require("fs");
  let rawdata = fs.readFileSync("./src/timecards.csv");
  let timecards = rawdata.toString().split("\n");
  let newTimecards = []; // New timecards to write to the file

  // Check if it is past 4:30 pm
  if (new Date().getHours() < 16) {
    return;
  }

  // Loop through the timecards and check if the user has a timecard
  for (let timecard of timecards) {
    const [user, timeIn, timeOut, day, signedInBy, signedOutBy] =
      timecard.split(",");
    if (timeOut == "") {
      newTimecards.push(
        [
          user,
          timeIn,
          new Date().toLocaleTimeString(),
          day,
          signedInBy,
          "automatic sign out",
        ].join(",")
      );
    } else {
      newTimecards.push(timecard);
    }
  }

  // Write the new timecards to the file
  fs.writeFileSync("./src/timecards.csv", newTimecards.join("\n"));
}, 300000);

const options = {
  key: fs.readFileSync("./server.key"),
  cert: fs.readFileSync("./server.crt"),
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
