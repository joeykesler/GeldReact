import "./Login.css";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import bcrypt from "bcryptjs";
import { useSearchParams } from "react-router-dom";



function Login(props) {

    // Page Variables
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPass, setNewPass] = useState("");
    const [msg, setMsg] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const isSignup = searchParams.get('signup') !== null;

    // Object Variables
    const [users, setUsers] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    
    // Get All Users
    useEffect(() => {
        async function getUsers() {
            await fetch("http://localhost:3001/users")
            .then(res => {
                return res.json();
            }).then(data => {
                setUsers(data.data);
            });
        }
        getUsers();
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
        console.log(pass);
        console.log(newPass);
        console.log(hashedPassword);
        let user = users[email];
        if(user!==undefined && users[email].pass === hashedPassword) {
            setMsg("Login Successful");
            setCurrentUser(user);
            localStorage.setItem("currentUser", currentUser);
            window.location.href = "/Dashboard";
        } else {
            console.log(users);
            console.log(user);
            setMsg("Login Failed");
        }
    }

    function handleCreateAccount() {
        
        if(users[newEmail] == undefined) {
            const hashedPassword = bcrypt.hashSync(newPass, "$2a$10$CwTycUXWue0Thq9StjUM0u");
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
            fetch('http://localhost:3001/users', {
                method: 'POST',
                body: JSON.stringify({"data": users}),
                headers: {
                  'Content-Type': 'application/json'
                }
            });
            window.location.href="/login";

        } else {
            setMsg("User Already Exists");
        }
    }

    return (
        <div>
            <Navbar/>
            {!isSignup && <div className="form loginForm">
                <h1>Login</h1>
                <div>
                    <label>Email: </label><input type="text" value={email} onChange={(e) => handleEmail(e)} /><br/>
                    <label>Password: </label><input type="text" value={pass} onChange={(e) => handlePass(e)} /><br/>
                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>}
            {isSignup && <div className="form createAccountForm">
                <h1>Create Account</h1>
                <div>
                    <label>Email: </label><input type="text" value={newEmail} onChange={(e) => handleNewEmail(e)} /><br/>
                    <label>Password: </label><input type="text" value={newPass} onChange={(e) => handleNewPass(e)} /><br/>
                    <button onClick={handleCreateAccount}>Create Account</button>
                </div>
            </div>}
            <div>{msg}</div>
        </div>
    );
}

export default Login;
