const { Videogame } = require('../../db');
const { Op } = require('sequelize');

async function filterByRating(req, res, next) {
  const { minRating, maxRating } = req.query;

  try {
    const gamesByRating = await Videogame.findAll({
      where: {
        rating: {
          [Op.between]: [minRating, maxRating]
        }
      }
    });

    res.json(gamesByRating);
  } catch (err) {
    next(err);
  }
}

module.exports = filterByRating;
