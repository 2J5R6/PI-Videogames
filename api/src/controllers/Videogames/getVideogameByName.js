const axios = require('axios');
const { Videogame } = require('../../models/Videogame');
const { Genre } = require('../../models/Genre');
const { Op } = require('sequelize');
require('dotenv').config();

const { API_KEY } = process.env;

async function getVideogamesByName(req, res, next) {
  const { name } = req.query;
  try {
    const response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
    const apiGamesByName = response.data.results;

    const dbGamesByName = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      },
      include: Genre
    });

    const allGamesByName = [...apiGamesByName, ...dbGamesByName];

    res.json(allGamesByName);
  } catch (err) {
    next(err);
  }
}

module.exports = getVideogamesByName;