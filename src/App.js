import "./App.css";
import LandingPage from "./Pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Explore from "./Pages/Explore";
import Account from "./Account";
import Stocks from "./Stocks";
import Portfolios from "./Portfolios";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/account" element={<Account />} />
        <Route path="/stocks" element={<Stocks />} />
        <Route path="/portfolios" element={<Portfolios />} />
      </Routes>
    </div>
  );
}

export default App;
