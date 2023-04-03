import Navbar from "./Components/Navbar/Navbar";
import { useState, useEffect } from 'react';
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import './Stocks.css';

function Stocks() {

    const[allStocks, setAllStocks] = useState([]);

    useEffect(() => {
        async function getStocks() {
            const result = await fetch('http://localhost:3001/stocks')
            .then(res => {
                return res.json();
            }).then(data => {
                console.log(data);
                setAllStocks(data.Stocks)
            });
        }
        getStocks();
    }, []);


    return(
        <div>
            <Navbar />
            <List>
                {allStocks.map((stock, index) => (
                <ListItem key={index}  className="stocksList">
                    <ListItemText primary={stock.name} />
                    <ListItemText primary={"$"+stock.value} />
                </ListItem>
                ))}
            </List>
        </div>
    );

}

export default Stocks;