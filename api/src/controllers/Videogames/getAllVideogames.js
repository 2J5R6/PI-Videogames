const axios = require('axios');
require('dotenv').config();

const { API_KEY } = process.env;

async function getAllVideogames(req, res, next) {
  try {
    const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    res.json(response.data);
  } catch (err) {
    next(err);
  }
}

module.exports = getAllVideogames;