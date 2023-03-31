import Navbar from "./Components/Navbar/Navbar";
import { useState, useEffect } from 'react';
import StockCard from "./Components/StockCard";
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import './Stocks.css';

function Stocks() {

    const[allStocks, setAllStocks] = useState([]);

    useEffect(() => {
        async function getStocks() {
            const result = await fetch('./stocks.json')
            .then(res => {
                return res.json();
            }).then(data => {
                console.log(data);
                setAllStocks(data.Stocks)
            });
        }
        getStocks();
        console.log(allStocks);
    }, []);


    return(
        <div>
            <Navbar />
            
            {/* <div className="stocksWrapper">
                {allStocks.map((stock, index) => {
                    console.log(stock);
                    return(
                        <StockCard key={index} stock={stock} />
                    )
                })}
            </div> */}
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