import React from "react";
import { useState } from "react";
import Search from "./components/Search.jsx";

const App = () => {
  const [searchTerm,setSearchTerm]=useState("");
  return (
    <main>
      <div className="pattern"/>
      
      <div className="wrapper">
        header
        <header className="header">
          <img src="./hero.png" alt="Hero Banner"/>
          <h1 >
            Find <span className="text-gradient">Movies</span> You'll Like Without the Hassle
          </h1>
          <p>Search for movies, TV shows, and more with ease.</p>
        </header>

        <Search  searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h2 className="text-white text-3xl">Results for "{searchTerm}"</h2>
      </div>

    </main>
  );
};

export default App;
