const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const PORT = 3001;

const app = express();

app.use(cors());
app.use(express.json());


function returnMemberList(username, team, permission){
    // If executive access everyone
    // If captain only access team
    // If member only access self 
    let fs = require('fs');
    let rawdata = fs.readFileSync('./src/users.csv');
    let users = rawdata.toString().split("\n");
    let memberList = [];
    for (let user of users){
        const [userTeam, name, userPermission, userUsername, userPassword] = user.split(",");
        if (permission == "executive" || (permission == "captain" && team == userTeam) || (permission == "member" && username == userUsername)){
            memberList.push({name: name, team: userTeam, permission: userPermission, username: userUsername});
        }
    }
    return memberList;
}

function isValidUser(providedUsername, providedPassword){
    // Open comma seperated values file
    let fs = require('fs');
    let rawdata = fs.readFileSync('./src/users.csv');
    let users = rawdata.toString().split("\n");
    for (let user of users) {
        const [team, name, permission, username, password] = user.split(",");
        console.log(JSON.stringify(providedUsername) + " " + JSON.stringify(username) + " " + JSON.stringify(providedPassword) + " " + JSON.stringify(password));
        if (providedUsername == username && providedPassword == password) {
            return [true, permission, name, team]; 
        }
    }
  return [false, "none"];
}

function authenticate(req, res, next){
    const {authorization} = req.headers;
    if (authorization){
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, "secretKey");
        if (decoded){
            next();
        } else {
            res.json({error: "invalid"});
        }
    } else {
      res.json({ error: "invalid" });
    }
}

app.get("/protected", authenticate, (req, res) => {
  res.json({ message: "You are authorized" });
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post('/login', (req, res) => {
    const {username, password} = req.body; 
    const [isValid, permission, name, team] = isValidUser(username, password);


    if (isValid){   
        const token = jwt.sign({username: username, permission: permission, name: name, team: team}, "secretKey"); 
        const memberList = returnMemberList(username, team, permission);
        res.json({token: token, memberList: memberList});
    } else {
        res.json({token: "invalid"});
        // res.status(401).json({error: "Invalid Username or Password"});
    }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
