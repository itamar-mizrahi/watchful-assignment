import {
  Link,
} from "react-router-dom";

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


  export default SearchResults;
  