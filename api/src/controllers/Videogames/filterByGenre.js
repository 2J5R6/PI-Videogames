const { Videogame } = require('../../db');

async function filterByGenre(req, res, next) {
  const { genre } = req.query;
  console.log("Genre:", genre);
  try {
    const gamesByGenre = await Videogame.findAll({
      include: {
        association: 'genres',
        where: { name: genre }
      }
    });
    console.log("Games by Genre:", gamesByGenre);
    if (gamesByGenre.length === 0) {
      return res.status(404).json({ message: `No games found for genre: ${genre}` });
    }

    res.json(gamesByGenre);
  } catch (err) {
    next(err);
  }
}

module.exports = filterByGenre;
