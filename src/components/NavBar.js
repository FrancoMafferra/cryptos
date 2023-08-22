import React from "react";
import { FaCoins } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./NavBar.css";
import SearchBar from "./SearchBar";

const NavBar = () => {
  return (
    <>
      <a href="/">
        <div className="navbar">
          <FaCoins className="icon" />
          <h1>
            Coin <span className="purple"> Search</span>
          </h1>
        </div>
      </a>
      <div className="barra">
      <SearchBar />
      <div className="elements">
        <Link to={"/"}>
      <button className="btn-search">coins</button>
      </Link>
      <Link to={"/nfts"}>
      <button className="btn-search">nft</button>
      </Link>
      </div>
      </div>
    </>
  );
};

export default NavBar;
