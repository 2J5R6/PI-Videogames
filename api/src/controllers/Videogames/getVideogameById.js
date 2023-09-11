const axios = require('axios');
require('dotenv').config();

const { API_KEY } = process.env;

async function getVideogameById(req, res, next) {
  const { idVideogame } = req.params;
  try {
    const response = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);
    res.json(response.data);
  } catch (err) {
    next(err);
  }
}

module.exports = getVideogameById;