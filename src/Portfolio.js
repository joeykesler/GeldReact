import { useEffect, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function Portfolio(props) {

    let portfolio = props.portfolio;
    const [allStocks, setAllStocks] = useState([]);
    const [funds, setFunds] = useState("");
    const [currentUser, setCurrentUser] = useState({});
    const [portfolioStocks, setPortfolioStocks] = useState([]);

    useEffect(() => {
        async function getStocks() {
            const result = await fetch('http://localhost:3001/stocks?stocks='+portfolio.stocks)
            .then(res => {
                return res.json();
            }).then(data => {
                console.log(data);
                setAllStocks(data.Stocks); 
                let arr = data.Stocks.filter(item => portfolio.stocks.includes(item.id));
                setPortfolioStocks(arr);
                setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
                setFunds(currentUser.funds);
            })
        }
        getStocks();
    }, []);

    function updateMarket() {
        let stocks = [...allStocks];
        let updatedPrice = {};
        stocks.forEach((stock) => {
            let variation = Math.floor(Math.random() * 10) - 5;
            stock.value += variation;
            updatedPrice[stock.id] = stock.value;
        });
        console.log(updatedPrice);
        
        let ownedStocks = [...portfolioStocks];
        ownedStocks.forEach((stock) => {
            stock.value = updatedPrice[stock.id];
        });

        setAllStocks(stocks);
        setPortfolioStocks(ownedStocks);
        
    }

    function sellStock(stock) {
        console.log(stock);
        let user = currentUser;
        let arr = portfolioStocks;
        arr.splice(portfolioStocks.indexOf(stock), 1);
        setPortfolioStocks(arr);
        user.funds += stock.value;
        props.portfolio.value += stock.value;
        setFunds(Number((user.funds).toFixed(2)));
        console.log(user);
        updateUser(user);
    }

    function buyStock(stock) {
        // console.log(stock);
        let user = currentUser;
        // if((user.funds -= stock.value) < 0) return;
        portfolio.stocks.push(stock.id);
        let arr = portfolioStocks;
        arr.push(stock);
        setPortfolioStocks(arr);
        console.log(portfolioStocks);
        user.funds -= stock.value;
        props.portfolio.value -= stock.value;
        setFunds(Number((user.funds).toFixed(2)));
        updateUser(user);
    }


    function updateUser(user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        setCurrentUser(user);
    }

    return (
        <div>
            <button onClick={updateMarket}>Update Market</button>
            <h1>{portfolio.name}</h1>
            <h2>Funds: {currentUser.funds}</h2>
            <h2>Portfolio Value: {props.portfolio.value}</h2>
            <h2>Stocks Owned</h2>
            <List>
                {portfolioStocks.map((stock, index) => (
                <ListItem key={index}  className="stocksList">
                    <ListItemText primary={stock.name} />
                    <ListItemText primary={"$"+stock.value} />
                    <button onClick={() => sellStock(stock)}>Sell</button>
                </ListItem>
                ))}
            </List>

            <h2>Purchase Stocks</h2>
            <List>
                {allStocks.map((stock, index) => (
                <ListItem key={index}  className="stocksList">
                    <ListItemText primary={stock.name} />
                    <ListItemText primary={"$"+stock.value} />
                    <button onClick={() => buyStock(stock)}>Buy</button>
                </ListItem>
                ))}
            </List>
        </div>
    )
}

export default Portfolio