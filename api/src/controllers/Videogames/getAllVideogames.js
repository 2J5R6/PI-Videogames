require('dotenv').config();
const axios = require('axios');
const { Videogame, Genre } = require('../../db');

const { API_KEY } = process.env;

async function getAllVideogames(req, res, next) {
  const { genre, order, source } = req.query;

  try {
    let allGames = [];

    // Si el usuario quiere videojuegos de la API
    if (!source || source === 'api') {
      const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
      const apiGames = response.data.results.map(game => {
        return {
          ...game,
          description: game.description || "Descripción no disponible",
          clip: game.clip || null // Añadir el clip del videojuego si está disponible, de lo contrario, null
        };
      });
      allGames = [...allGames, ...apiGames];

      // Guardar videojuegos en la base de datos si aún no existen
      for (let game of apiGames) {
        const [instance, created] = await Videogame.findOrCreate({
          where: { name: game.name },
          defaults: {
            description: game.description,
            platforms: game.platforms.map(p => p.platform.name),
            image: game.background_image,
            rating: game.rating,
            releaseDate: new Date(game.released),
            videoClip: game.clip // Guardar el clip del videojuego
          }
        });

        // Si el videojuego fue creado, asociar los géneros
        if (created) {
          const genres = await Genre.findAll({
            where: { name: game.genres.map(g => g.name) }
          });
          await instance.setGenres(genres);
        }
      }
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
