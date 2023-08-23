const express = require("express");
const cors = require("cors");

const PORT = 3001;

const app = express();

app.use(cors());
app.use(express.json());

function isValidUser(providedUsername, providedPassword){
    // Open comma seperated values file
    let fs = require('fs');
    let rawdata = fs.readFileSync('./src/users.csv');
    let users = rawdata.toString().split("\n");
    for (let user of users){
        const [team, name, permission, username, password] = user.split(",");
        return (providedUsername === username && providedPassword === password);
    }
}



function authenticate(req, res, next){
    const {authorization} = req.headers;
    if (authorization){
        const token = authorization.split(" ")[1];
        if (token === "bigballshd4kmegamax"){
            next();
        } else {
            res.json({error: "invalid"});
            res.status(403).json({error: "Forbidden ;)"});
        }
    } else {
        res.status(401).json({error: "Unauthorized"});
    }
}

app.get('/protected', authenticate, (req, res) => {
    res.json({message: "You are authorized"});
});


app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.post('/login', (req, res) => {
    const {username, password} = req.body; 
    
    if (isValidUser(username, password)){   
        res.json({token: "bigballshd4kmegamax"}); 
    } else {
        res.json({token: "invalid"});
        // res.status(401).json({error: "Invalid Username or Password"});
    }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});