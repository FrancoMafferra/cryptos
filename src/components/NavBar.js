import React from "react";
import { FaCoins } from "react-icons/fa";
import "./NavBar.css";
import { Link } from "react-router-dom";
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
      <SearchBar />
    </>
  );
};

export default NavBar;
