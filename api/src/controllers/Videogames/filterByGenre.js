const { Videogame } = require('../../db');

async function filterByGenre(req, res, next) {
  const { genre } = req.query;

  try {
    const gamesByGenre = await Videogame.findAll({
      include: {
        association: 'genres',
        where: { name: genre }
      }
    });

    res.json(gamesByGenre);
  } catch (err) {
    next(err);
  }
}

module.exports = filterByGenre;
