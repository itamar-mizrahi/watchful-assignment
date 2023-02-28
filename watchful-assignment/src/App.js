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
