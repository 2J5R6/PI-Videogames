const axios = require('axios');
require('dotenv').config();

const { API_KEY } = process.env;

async function getVideogamesByName(req, res, next) {
  const { name } = req.query;
  try {
    const response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
    res.json(response.data);
  } catch (err) {
    next(err);
  }
}

module.exports = getVideogamesByName;