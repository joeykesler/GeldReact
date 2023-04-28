import "./Portfolios.css";
import Portfolio from './Portfolio';
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import bcrypt from "bcryptjs";
import { useSearchParams } from "react-router-dom";
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import './Stocks.css';


function Portfolios() {

    const [userPortfolios, setUserPortfolios] = useState([]);
    const [allPortfolios, setAllPortfolios] = useState([]);
    const [stocks, setStocks] = useState({});
    const [msg, setMsg] = useState("");
    const [showPortfolio, setShowPortfolio] = useState(false);
    const [selectedPortfolio, setSelectedPortfolio] = useState({});
    const [newName, setNewName] = useState("");
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        async function getPortfolios() {
            const result = await fetch("http://localhost:3001/portfolios")
            .then(res => res.json()) 
            .then(data => {
                return data.Portfolios;
            });
            console.log(result);
            let currentUser = JSON.parse(localStorage.getItem("currentUser"));
            console.log(currentUser.email);
            if(result[currentUser.email])
            setUserPortfolios(result[currentUser.email]);
        }
        getPortfolios();
    }, []);

    function handleShowPortfolio() {
        setShowPortfolio(!showPortfolio);
    }

    function handleSelectPortfolio(portfolio) {
        setSelectedPortfolio(portfolio);
        handleShowPortfolio();
    }

    function handleNewName(e) {
        setNewName(e.target.value);
        console.log(newName)
    }

    function handleShowForm() {
        setShowForm(!showForm);
        console.log(showForm);
    }

    function handleCreatePortfolio() {
        if(newName=='') {
            setMsg("Enter a valid name");
            return;
        }
        console.log(newName);
        console.log(userPortfolios);
        let portfolios = userPortfolios;
        portfolios.push({
            id: portfolios.length,
            name: newName,
            stocks: [],
            value: 0
        });
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let email = currentUser.email;
        fetch('http://localhost:3001/portfolios', {
            method: 'POST',
            body: JSON.stringify(
                {
                    "user": email,
                    "portfolios": portfolios
                }
                ),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(portfolios);
        window.location.href = '/portfolios';
    }


    return (
        <div>
            <Navbar />
            {showPortfolio && <Portfolio portfolio={selectedPortfolio} />}
            {!showPortfolio && userPortfolios.map((portfolio, index) => (
                <ListItem onClick={() => handleSelectPortfolio(portfolio)} key={index} className="stocksList">
                    <ListItemText primary={portfolio.name} />
                    <ListItemText primary={"$"+portfolio.value} />
                </ListItem>
            ))}
            <button onClick={() => handleShowForm()}>New Portfolio</button>
            {showForm && 
                <div>
                    <h2>Create Portfolio</h2>
                    <label>Name: </label><input type="text" value={newName} onChange={(e) => handleNewName(e)} />
                    <button onClick={() => handleCreatePortfolio()}>Create Portfolio</button>
                    <div>
                        {msg}
                    </div>
                </div>
                
            }
        </div>
    )

}

export default Portfolios;