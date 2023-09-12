const { Videogame, Genre } = require('../../db');

async function createVideogame(req, res, next) {
  const { name, description, platforms, releaseDate, rating, developer, userCreated, image, genres } = req.body;

  try {
    // Verificar si ya existe un videojuego con el mismo nombre
    const existingVideogame = await Videogame.findOne({ where: { name } });
    if (existingVideogame) {
      return res.status(400).json({ message: 'El nombre del videojuego ya está en uso.' });
    }

    // Crear el videojuego si no existe
    const newVideogame = await Videogame.create({
      name,
      description,
      platforms,
      releaseDate,
      rating,
      developer,
      userCreated,
      image
    });

    // Asociar géneros si se proporcionan
    if (genres && genres.length > 0) {
      const genresInstances = await Genre.findAll({
        where: { name: genres }
      });
      await newVideogame.addGenres(genresInstances);
    }

    res.json(newVideogame);
  } catch (err) {
    next(err);
  }
}

module.exports = createVideogame;
