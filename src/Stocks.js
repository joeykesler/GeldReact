import Navbar from "./Components/Navbar/Navbar";
import { useState, useEffect } from 'react';
import StockCard from "./Components/StockCard";

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
            // return result 
        }
        getStocks();
        console.log(allStocks);
    }, []);

    return(
        <div>
            <Navbar />
            <div className="stocksWrapper">
                {allStocks.map((stock, index) => {
                    console.log(stock);
                    return(
                        <StockCard key={index} stock={stock} />
                    )
                })}
            </div>
        </div>
        
    );
}

export default Stocks;