import { Box } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";
import Stack from "@mui/material/Stack";
import TradingViewChart from "../Components/TradeviewWidget/tradeviewChart";
import TradingStockBanner from "../Components/TradeviewWidget/tradeviewStockBanner";
import FundementalData from "../Components/TradeviewWidget/fundementalData";
import StockNews from "../Components/TradeviewWidget/stockNews";
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
      <Box sx={{ width: "95%", ml: "65px", mt: "10px", height: "360px" }}>
        <TradingViewChart symbol={selectedStock} />
      </Box>
      <Stack direction={"row"}>
        <Box sx={{ ml: "65px", width: "50%" }}>
          <FundementalData symbol={selectedStock} />
        </Box>
        <Box sx={{ width: "50%" }}>
          <StockNews symbol={selectedStock} />
        </Box>
      </Stack>
    </div>
  );
}

export default Dashboard;
