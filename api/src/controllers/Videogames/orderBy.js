const { Videogame } = require('../../db');

async function orderBy(req, res, next) {
  const { criteria } = req.query; // Ejemplo: "name", "releaseDate", "rating"

  try {
    const orderedGames = await Videogame.findAll({
      order: [
        [criteria, 'ASC'] // Puedes cambiar 'ASC' a 'DESC' para orden descendente
      ]
    });

    res.json(orderedGames);
  } catch (err) {
    next(err);
  }
}

module.exports = orderBy;
