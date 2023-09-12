const { Videogame } = require('../../db');

async function createVideogame(req, res, next) {
  // Extraemos los datos del videojuego del cuerpo de la solicitud
  const videogameData = req.body;

  try {
    // Intentamos crear un nuevo videojuego en la base de datos con los datos proporcionados
    const newVideogame = await Videogame.create(videogameData);

    // Si la creación es exitosa, respondemos con el videojuego creado
    res.json(newVideogame);
  } catch (err) {
    // Si hay un error, lo pasamos al siguiente middleware (probablemente un manejador de errores)
    next(err);
  }
}

module.exports = createVideogame;
