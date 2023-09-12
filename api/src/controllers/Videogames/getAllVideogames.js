require('dotenv').config();
const axios = require('axios');
const { Videogame } = require('../../models/Videogame');
const { Genre } = require('../../models/Genre');
const { API_KEY } = process.env;

async function getAllVideogames(req, res, next) {
  try {
    const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    const apiGames = response.data.results;

    console.log('FUNCIONA')
    const dbGames = await Videogame.findAll({
      include: Genre
    });

    const allGames = [...apiGames, ...dbGames];

    res.json(allGames);
  } catch (err) {
    next(err);
  }
}

module.exports = getAllVideogames;
