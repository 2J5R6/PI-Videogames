require('dotenv').config();
const axios = require('axios');
const { Videogame, Genre } = require('../../db');

const { API_KEY } = process.env;

async function getAllVideogames(req, res, next) {
  const { genre, order, source } = req.query; // Extraemos los parámetros de consulta

  try {
    let allGames = [];

    // Si el usuario quiere videojuegos de la API
    if (!source || source === 'api') {
      const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
      allGames = [...allGames, ...response.data.results];
    }

    // Si el usuario quiere videojuegos de la base de datos
    if (!source || source === 'db') {
      const dbGames = await Videogame.findAll({
        include: Genre
      });
      allGames = [...allGames, ...dbGames];
    }

    // Filtrar por género si se proporciona
    if (genre) {
      allGames = allGames.filter(game => game.genres.some(g => g.name.toLowerCase() === genre.toLowerCase()));
    }

    // Ordenar los videojuegos si se proporciona un orden
    if (order === 'asc') {
      allGames.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === 'desc') {
      allGames.sort((a, b) => b.name.localeCompare(a.name));
    }

    res.json(allGames);
  } catch (err) {
    next(err);
  }
}


module.exports = getAllVideogames;
