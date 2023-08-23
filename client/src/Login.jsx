import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

// [state, function to update state
    function AuthenticateUser(e, isLoggedIn, setIsLoggedIn, setToken) {
        // Global isloggedin
        e.preventDefault();

        // Get username and password from form
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        console.log("username: " + username);
        console.log("password: " + password);

            fetch("http://localhost:3001/login", {
                method: "POST",
                body: JSON.stringify({ username, password }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setToken(data.token);
                    setIsLoggedIn(true);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        // // Check if username and password are correct with server's /login  

        // If there is no error then we use the token for requesting any further data
        setIsLoggedIn(true);
    }


// Make login exit once user is logged in
function Login() {

    const [isLoggedIn, setIsLoggedIn] = React.useState(false); // [state, function to update state
    const [token, setToken] = React.useState("");

    console.log("RUNNING LOGIN");


    if (isLoggedIn) {
        console.log("nice user and pass");
        return (
            <div className="App">
                {/*  Goofy ahh image */}
                <img src="https://i.pinimg.com/1200x/cc/1b/20/cc1b20c4eaa7a48bd1b416eee8c01e57.jpg" alt="logo" />
                <p>Logged in!</p>
            </div>
        );
    } else {
        return (
            <div className="App">
                <p>Log In using your user ID and password.</p>
                {/* Start of login form */}
                <form onSubmit={(event) => AuthenticateUser(event, isLoggedIn, setIsLoggedIn, setToken )}>
                    <label>
                        Username:
                        <input type="text" name="username" id="username" />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="text" name="password" id="password" />
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}


export default Login;