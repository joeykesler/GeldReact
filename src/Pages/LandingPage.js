import "../App.css";
import Box from "@mui/material/Box";
import { Stack, Typography, TextField, Button } from "@mui/material";
import Navbar from "../Components/Navbar/Navbar";

function LandingPage() {
  return (
    <div className="App">
      <Navbar />
      <div className="pageLayout">
        <div className="Hero">
          <Box sx={{ width: "60%" }}>
            <span width="100%">
              <img
                src="https://images.ctfassets.net/c5bd0wqjc7v0/4wIqz75f85ZdWPycY3Iggj/2c00a25445cd0ee6840fc67860e8ffdd/Hero.png?fm=webp&q=100&w=1180"
                width={"100%"}
              ></img>
            </span>
          </Box>
          <Stack
            direction={"column"}
            width={"40%"}
            sx={{ display: "flex", justifyContent: "center", height: "auto" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h2">The future of money is here</Typography>
            </Box>
            <Box sx={{ marginBottom: "60px" }}>
              <Typography fontSize={"32px"}>
                Over 108 million people and businesses trust us to buy, sell,
                and manage crypto.
              </Typography>
            </Box>
          </Stack>

          <div className="SignUp"></div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
