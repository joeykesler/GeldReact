import { Box, Typography } from "@mui/material";
import Navbar from "../Components/Navbar/Navbar";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";
import "../App.css";
import TickerTape from "../Components/TradeviewWidget/trickerTape";
function Explore() {
  const [allStocks, setAllStocks] = useState([]);

  useEffect(() => {
    async function getStocks() {
      const result = await fetch("./stocks.json")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setAllStocks(data.Stocks);
        });
    }
    getStocks();
    console.log(allStocks);
  }, []);

  //console.log(Stocks);
  return (
    <Box>
      <Navbar />
      <Stack spacing={5} sx={{ width: "100%" }}>
        <Box height={90} />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Stack direction={"column"}>
            <Typography variant="h2">Explore the Stock World</Typography>
            <Typography textAlign={"center"} variant="h5">
              In the past 24 hours the market is
            </Typography>
            <TickerTape />
          </Stack>
        </Box>

        {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Autocomplete
            freeSolo
            sx={{ width: "40%" }}
            id="free-solo-2-demo"
            disableClearable
            options={allStocks.map((option) => option.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search input"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Box> */}
      </Stack>
    </Box>
  );
}

export default Explore;
