const axios = require('axios');
const { Genre } = require('../../db');
require('dotenv').config();

const { API_KEY } = process.env;

async function getAllGenres(req, res, next) {
  try {
    let genres = await Genre.findAll();

    if (genres.length === 0) {
      const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
      genres = await Genre.bulkCreate(response.data.results);
    }

    res.json(genres);
  } catch (err) {
    next(err);
  }
}

module.exports = getAllGenres;
