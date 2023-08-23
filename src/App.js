import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./routes/Coin.js";
import Coins from "./components/Coins";
import Nfts from "./routes/Nfts.js";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";

function App() {
  const [coins, setCoins] = useState([]);

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false";

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCoins(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Coins coins={coins} />} />
        <Route path="/coin" element={<Coin />} />
        <Route path="/coin/:coinId" element={<Coin />} />
        <Route path="/nfts" element={<Nfts />} />
      </Routes>
    </>
  );
}

export default App;
