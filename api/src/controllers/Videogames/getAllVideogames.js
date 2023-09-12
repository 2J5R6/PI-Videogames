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
        // Proporcionar un valor predeterminado si la descripción es null o undefined
        game.description = game.description || "Descripción no disponible";
        return game;
      });
      allGames = [...allGames, ...apiGames];

      // Guardar videojuegos en la base de datos si aún no existen
      for (let game of apiGames) {
        const [instance, created] = await Videogame.findOrCreate({
          where: { name: game.name },
          defaults: {
            description: game.description,
            platforms: game.platforms.map(p => p.platform.name), // Mantener las plataformas como un array
            image: game.background_image,
            rating: game.rating
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
