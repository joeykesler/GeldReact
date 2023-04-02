import './Login.css';
import { useState, useEffect } from 'react'
import Navbar from './Components/Navbar/Navbar';
import sha256 from 'crypto-js/sha256';
import { AES } from 'crypto-js';
import CryptoJS from 'crypto-js';
import bcrypt from 'bcryptjs';


function Login() {

    // Page Variables
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [msg, setMsg] = useState('');

    // Object Variables
    const [users, setUsers] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    
    // Get All Users
    useEffect(() => {
        fetch('./users.json')
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
        // TODO: Hash password

        setPass(e.target.value);
    }

    // Handle Submit Login Form and Set Current User
    function handleLogin() {
        const hashedPassword = bcrypt.hashSync(pass, '$2a$10$CwTycUXWue0Thq9StjUM0u');
        console.log(hashedPassword);
        let user = users[email];
        if(user!==undefined && users[email].pass === hashedPassword) {
            setMsg('Login Successful');
            setCurrentUser(user);
            localStorage.setItem("currentUser", currentUser);
            window.location.href = '/';
            // TODO: Redirect to user page on success

        } else {
            setMsg('Login Failed');
        }
    }

    return (
        <div>
            <Navbar/>
            <h1>Login</h1>
            <div>
                <input type="text" value={email} onChange={(e) => handleEmail(e)} /><br/>
                <input type="text" value={pass} onChange={(e) => handlePass(e)} /><br/>
                <button onClick={handleLogin}>Login</button>
            </div>
            <div>{msg}</div>
        </div>
    );
}

export default Login;
