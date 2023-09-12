const { Videogame } = require('../../db');

async function orderBy(req, res, next) {
  const { criteria } = req.query;

  // Lista de criterios válidos. Puedes agregar o quitar columnas según tu modelo.
  const validCriteria = ['name', 'releaseDate', 'rating', 'developer', 'platforms'];

  // Verificar si el criterio es válido
  if (!validCriteria.includes(criteria)) {
    return res.status(400).json({ error: 'Invalid criteria' });
  }

  try {
    const orderedGames = await Videogame.findAll({
      order: [
        [criteria, 'ASC']
      ]
    });

    res.json(orderedGames);
  } catch (err) {
    next(err);
  }
}

module.exports = orderBy;

