import React, { useState, useEffect } from "react";
import axios from "axios";

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

  export default MovieDetails;