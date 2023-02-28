import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import MovieDetails from "./components/MovieDetails";
import SearchResults from "./components/SearchResults";
import SearchBar from "./components/SearchBar";

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
