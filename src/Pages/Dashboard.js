import { Box } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";
import TradingViewChart from "../Components/TradeviewWidget/tradeviewChart";
import TradingStockBanner from "../Components/TradeviewWidget/tradeviewStockBanner";

function Dashboard() {
  const [selectedStock, setSelectedStock] = useState(null);
  const handleStockSelect = (stockSymbol) => {
    setSelectedStock(stockSymbol);
  };
  return (
    <div>
      <Sidebar onStockSelect={handleStockSelect} />
      <Box ml={"65px"} width={"95%"}>
        <TradingStockBanner symbol={selectedStock} />
      </Box>
      <Box sx={{ width: "95%", ml: "65px", mt: "10px", height: "600px" }}>
        <TradingViewChart symbol={selectedStock} />
      </Box>
    </div>
  );
}

export default Dashboard;
