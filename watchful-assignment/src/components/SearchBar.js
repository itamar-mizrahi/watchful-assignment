import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const history = useHistory();
  const handleSearch = async () => {
    const response = await axios.get(`http://localhost:5000/search/${query}`);
    const data = response.data || [];
    history.push({
      pathname: "/search",
      state: { data },
    });
  };

  return (
    <>
      <div className="search-container">
        <h1> Search A Movie </h1>
        <input
          className="search-input"
          type="text"
          placeholder="search by title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </>
  );
};

export default SearchBar;
