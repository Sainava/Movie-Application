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
          //onChange is a React event prop that gets triggered whenever the input field's value changes
          //e is the event object that React automatically passes to the event handler
          //e.target refers to the DOM element that triggered the event - in this case, the <input> element
          //This gives you access to all properties and methods of that input element
        />
    </div>
  );
};

export default Search;