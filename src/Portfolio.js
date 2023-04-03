import { useEffect, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function Portfolio(props) {

    let portfolio = props.portfolio;
    const [allStocks, setAllStocks] = useState([]);
    const [funds, setFunds] = useState(localStorage.getItem("currentUser").funds);

    useEffect(() => {
        async function getStocks() {
            const result = await fetch('http://localhost:3001/stocks?stocks='+portfolio.stocks)
            .then(res => {
                return res.json();
            }).then(data => {
                console.log(data);
                setAllStocks(data.Stocks); 
            });
        }
        getStocks();
    }, []);   

    function sellStock(stock) {
        console.log(stock);
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        currentUser.funds += stock.value;
        console.log(portfolio.stocks.indexOf(stock.id));
        console.log(currentUser);
        setFunds(currentUser.funds);
        updateUser(currentUser);
    }

    function buyStock(stock) {
        
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if((currentUser.funds -= stock.value) < 0) return;
        portfolio.stocks.push(stock.id);
        currentUser.funds -= stock.value;
        setFunds(currentUser.funds);
        updateUser(currentUser);
    }

    function updateUser(user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
    }

    return (
        <div>
            <h1>{portfolio.name}</h1>
            <h2>Funds: {funds}</h2>
            <h2>Stocks</h2>
            <List>
                {allStocks.map((stock, index) => (
                <ListItem key={index}  className="stocksList">
                    <ListItemText primary={stock.name} />
                    <ListItemText primary={"$"+stock.value} />
                    <button onClick={() => buyStock(stock)}>Buy</button>
                    <button onClick={() => sellStock(stock)}>Sell</button>
                </ListItem>
                ))}
            </List>
        </div>
    )
}

export default Portfolio