import "./Login.css";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import bcrypt from "bcryptjs";



function Login() {

    // Page Variables
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPass, setNewPass] = useState("");
    const [msg, setMsg] = useState("");

    // const fs = require('fs');

    // Object Variables
    const [users, setUsers] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    
    // Get All Users
    useEffect(() => {
        fetch("./users.json")
        .then(res => {
            return res.json();
        }).then(data => setUsers(data.data));
    }, []);
    
    // Update local email var
    function handleEmail(e) {
        setEmail(e.target.value);
    }

    // Update local pass var
    function handlePass(e) {
        setPass(e.target.value);
    }

    // Update local email var
    function handleNewEmail(e) {
        setNewEmail(e.target.value);
    }

    // Update local pass var
    function handleNewPass(e) {
        setNewPass(e.target.value);
    }

    // Handle Submit Login Form and Set Current User
    function handleLogin() {
        const hashedPassword = bcrypt.hashSync(pass, "$2a$10$CwTycUXWue0Thq9StjUM0u");
        console.log(hashedPassword);
        let user = users[email];
        if(user!==undefined && users[email].pass === hashedPassword) {
            setMsg("Login Successful");
            setCurrentUser(user);
            localStorage.setItem("currentUser", currentUser);
            window.location.href = "/Dashboard";
        } else {
            setMsg("Login Failed");
        }
    }

    function handleCreateAccount() {
        
        if(users[newEmail] == undefined) {
            const hashedPassword = bcrypt.hashSync(pass, "$2a$10$CwTycUXWue0Thq9StjUM0u");
            let tempUsers = users;
            tempUsers[newEmail] = {
                "pass": hashedPassword,
                "user": {
                    "email": newEmail,
                    "funds": 0,
                    "portfolios": []
                }
            };
            setUsers(tempUsers);
            console.log("users", users);
            fetch('http://localhost:3000/users.json', {
                method: 'POST',
                body: JSON.stringify({"data": users}),
                headers: {
                  'Content-Type': 'application/json'
                }
            });

        } else {
            setMsg("User Already Exists");
        }
    }

    return (
        <div>
            <Navbar/>
            <div className="form loginForm">
                <h1>Login</h1>
                <div>
                    <label>Email: </label><input type="text" value={email} onChange={(e) => handleEmail(e)} /><br/>
                    <label>Password: </label><input type="text" value={pass} onChange={(e) => handlePass(e)} /><br/>
                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>
            <div className="form createAccountForm">
                <h1>Create Account</h1>
                <div>
                    <label>Email: </label><input type="text" value={newEmail} onChange={(e) => handleNewEmail(e)} /><br/>
                    <label>Password: </label><input type="text" value={newPass} onChange={(e) => handleNewPass(e)} /><br/>
                    <button onClick={handleCreateAccount}>Login</button>
                </div>
            </div>
            <div>{msg}</div>
        </div>
    );
}

export default Login;
