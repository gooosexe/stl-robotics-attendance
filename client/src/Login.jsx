import React from "react";
import "./App.css";
import "./index.css";

// Global isloggedin
let isLoggedIn = false; // Replace with your own logic to check if user is logged in

// Make login exit once user is logged in
function Login() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false); // [state, function to update state
    console.log("RUNNING LOGIN"); 

    const authenticateUser = (e) => {
        e.preventDefault();
        console.log("RUNNING AUTHENTICATE USER"); 
        setIsLoggedIn(true); 
    }

    if (isLoggedIn) {
        console.log("nice user and pass");

        return (
            <div className="App">
                <img src="https://i.pinimg.com/1200x/cc/1b/20/cc1b20c4eaa7a48bd1b416eee8c01e57.jpg" alt="logo" />
                <p>Logged in!</p>
            </div>
        );
    } else {
        console.log("bad user and pass");
        return (
            <div className="App">
                <p>Log In using your user ID and password.</p>
                {/* Start of login form */}
                <form onSubmit={authenticateUser}>
                    <label>
                        Username:
                        <input type="text" name="username" id="username"/>
                    </label>
                    <br />
                    <label>
                        Password: 
                        <input type="text" name="password" id="password"/>
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default Login;