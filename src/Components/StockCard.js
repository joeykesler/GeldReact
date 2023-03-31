

function StockCard(props) {
    
    let stock = props.stock;
    
    return(
        <div className="stockCardWrapper">
            <span>{stock.name}: {stock.value}</span>
        </div>
    )
}

export default StockCard;