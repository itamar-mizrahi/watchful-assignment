import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import "./App.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const history = useHistory();
  const handleSearch = async () => {
    const response = await axios.get(`http://localhost:5000/search/${query}`);
    const data = response.data || [];
    console.log(query);
    console.log(data);
    history.push({
      pathname: "/search",
      state: { data },
    });
  };

  return (
    <>
      <div className="search-container">
        <h1> search a movie </h1>
        <input 
        className="search-input"
          type="text"
          placeholder="search by title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
    </>
  );
};

const SearchResults = ({ location }) => {
  const { data } = location.state;
  const dataArr = [data];
  return (
    <div className="search-container">
      <h2 className="search-result-header">Search Results</h2>
        {dataArr.map((movie) => (
          <li key={movie.imdbID}>
            <Link to={`movie/${movie.imdbID}`}>
              <img  className="search-result-image" src={movie.Poster} alt={movie.Title} />
              <span className="search-result-details">{movie.Title}</span>
            </Link>
          </li>
        ))}
    </div>
  );
};

const MovieDetails = ({ match }) => {
  const { id } = match.params;
  const [movie, setMovie] = useState(null);

  const fetchMovieDetails = async () => {
    const response = await axios.get(`http://localhost:5000/movie/${id}`);
    const data = response.data;

    setMovie(data);
  };

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="search-container">
      <h2>{movie.Title}</h2>
      <img className="search-result-image" src={movie.Poster} alt={movie.Title} />
      <p>{movie.Plot}</p>
      <p>Director: {movie.Director}</p>
      <p>Cast: {movie.Actors}</p>
      <p>IMDb Rating: {movie.imdbRating}</p>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SearchBar} />
        <Route exact path="/search" component={SearchResults} />
        <Route exact path="/movie/:id" component={MovieDetails} />
      </Switch>
    </Router>
  );
};

export default App;
