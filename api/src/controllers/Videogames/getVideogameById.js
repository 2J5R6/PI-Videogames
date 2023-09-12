const axios = require('axios');
const { Videogame, Genre } = require('../../db');
require('dotenv').config();

const { API_KEY } = process.env;

async function getVideogameById(req, res, next) {
  // Extraemos el ID del videojuego de los parámetros de la ruta
  const { idVideogame } = req.params;

  try {
    // Intentamos buscar el videojuego en nuestra base de datos por su ID
    const dbGame = await Videogame.findByPk(idVideogame, {
      include: Genre // Incluimos los géneros asociados al videojuego
    });

    // Si encontramos el videojuego en nuestra base de datos, respondemos con él
    if (dbGame) {
      return res.json(dbGame);
    }

    // Si no encontramos el videojuego en nuestra base de datos, intentamos buscarlo en la API de RAWG
    const response = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);

    // Respondemos con los datos del videojuego obtenidos de la API de RAWG
    res.json(response.data);
  } catch (err) {
    // Si hay un error, lo pasamos al siguiente middleware (probablemente un manejador de errores)
    next(err);
  }
}

module.exports = getVideogameById;
