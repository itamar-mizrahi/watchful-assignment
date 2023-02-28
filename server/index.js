const express = require("express");
const axios = require("axios");
const NodeCache = require("node-cache");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });
const key = process.env.KEY || "b21f6098";

app.use(cors());

app.get("/search/:query", async (req, res) => {
  const { query } = req.params;
  const cachedData = cache.get(query);

  if (cachedData) {
    res.json(cachedData);
  } else {
    const response = await axios.get(
      `http://www.omdbapi.com/?t=${query}&apikey=${key}`
    );
    const data = response.data || [];

    cache.set(query, data);

    res.json(data);
  }
});

app.get("/movie/:id", async (req, res) => {
  const { id } = req.params;
  const cachedData = cache.get(id);

  if (cachedData) {
    res.json(cachedData);
  } else {
    const response = await axios.get(
      `http://www.omdbapi.com/?i=${id}&apikey=${key}`
    );
    const data = response.data;

    cache.set(id, data);

    res.json(data);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
