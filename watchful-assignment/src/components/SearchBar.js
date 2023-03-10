/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import searchImage from '../assets/searchImage.png'
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const history = useHistory();

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(`http://localhost:5000/search/${query}`);
    console.log(response);
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
        <form onSubmit={handleSearch}>
          <input
            className="search-input"
            type="text"
            placeholder="search by title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-button">Search</button>
        </form>
        <img  className="searchImage" src={searchImage} alt="image"/>
      </div>
    </>
  );
};

export default SearchBar;
