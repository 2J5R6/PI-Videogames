
const axios = require('axios');
const { Videogame, Genre } = require('../../db');
const { Op } = require('sequelize');
require('dotenv').config();

const { API_KEY } = process.env;

// Función para obtener videojuegos por nombre
async function getVideogamesByName(req, res, next) {
  const { name } = req.query; // Extraer el nombre del videojuego de la consulta
  
  try {
    // Buscar videojuegos con el nombre dado en la API
    const response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
    const apiGamesByName = response.data.results.map(game => ({
      id: game.id,
      name: game.name,
      platforms: game.platforms.map(p => p.platform.name),
      image: game.background_image,
      rating: game.rating
    }));

    // Buscar videojuegos con el nombre dado en la base de datos
    const dbGamesByName = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      },
      include: Genre
    });

    // Combinar los resultados de la API y la base de datos
    const allGamesByName = [...apiGamesByName, ...dbGamesByName];

    res.json(allGamesByName);
  } catch (err) {
    next(err);
  }
}

module.exports = getVideogamesByName;