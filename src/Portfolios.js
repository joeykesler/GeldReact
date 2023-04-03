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
    const [stocks, setStocks] = useState({});
    const [showPortfolio, setShowPortfolio] = useState(false);
    const [selectedPortfolio, setSelectedPortfolio] = useState({});
    const [newName, setNewName] = useState("");

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
    }

    function handleCreatePortfolio() {
        
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
            {showForm && 
                <div>
                    <h2>Create Portfolio</h2>
                    <label>Name: </label><input type="text" value={newName} onChange={(e) => handleNewName(e)} />
                    <button onClick={() => handleCreatePortfolio}>Create Portfolio</button>
                </div>
            }
        </div>
    )

}

export default Portfolios;