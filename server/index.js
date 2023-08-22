const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

function isValidUser(username, password){
    return true;
}

function authenticate(req, res, next){
    const {authorization} = req.headers;
    if (authorization){
        const token = authorization.split(" ")[1];
        if (token === "bigballshd4kmegamax"){
            next();
        } else {
            res.status(403).json({error: "Forbidden ;)"});
        }
    } else {
        res.status(401).json({error: "Unauthorized"});
    }
}

app.get('/protected', authenticate, (req, res) => {
    res.json({message: "You are authorized"});
});

app.get('/login', (req, res) => {
    const {username, password} = req.body; 
    if (isValidUser(username, password)){
        const token = "bigballshd4kmegamax";
        res.json({token}); 
    } else {
        res.status(401).json({error: "Invalid Username or Password"});
    }
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});