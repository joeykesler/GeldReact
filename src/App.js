import "./App.css";
import LandingPage from "./Pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Explore from "./Pages/Explore";
import Login from "./Login";
import Stocks from "./Stocks";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/stocks" element={<Stocks />} />
      </Routes>
    </div>
  );
}

export default App;
