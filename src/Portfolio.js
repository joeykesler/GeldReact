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
                console.log('arr', arr);
                setPortfolioStocks(arr);
                setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
                setFunds(currentUser.funds);
            })
            
        }
        getStocks();
        
        
    }, []);

    function sellStock(stock) {
        // console.log(stock);
        currentUser.funds += stock.value;
        // console.log(portfolio.stocks.indexOf(stock.id));
        // console.log(currentUser);
        updateUser(currentUser);
    }

    function handleStockSale(stock, buy) {
        console.log(stock);
        let user = currentUser;
        // if(bos === -1 && (user.funds -= stock.value) < 0) return;
        // portfolio.stocks.push(stock.id);
        if(buy) {
            user.funds -= stock.value;
        } else {
            user.funds += stock.value;
        }
        setFunds(Number((user.funds).toFixed(2)));
        console.log(user);
        updateUser(user);
    }

    function updateUser(user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        console.log(localStorage.getItem("currentUser"));
        setCurrentUser(user);
    }

    return (
        <div>
            <h1>{portfolio.name}</h1>
            <h2>Funds: {currentUser.funds}</h2>
            <h2>Stocks</h2>
            <List>
                {portfolioStocks.map((stock, index) => (
                <ListItem key={index}  className="stocksList">
                    <ListItemText primary={stock.name} />
                    <ListItemText primary={"$"+stock.value} />
                    <button onClick={() => handleStockSale(stock, true)}>Buy</button>
                    <button onClick={() => handleStockSale(stock, false)}>Sell</button>
                </ListItem>
                ))}
            </List>
        </div>
    )
}

export default Portfolio