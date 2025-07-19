import React from "react";

// Props should never be changed by the child component.It should be  read only 
const Search = ({searchTerm,setSearchTerm}) => {
  return (
    <div className="search">
        <img src="search.svg" alt="Search Icon" />
        
        <input
          type="text"
          placeholder="Search through thousands of movies, TV shows, and more..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // e for event
        />
    </div>
  );
};

export default Search;