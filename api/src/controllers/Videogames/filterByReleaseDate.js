const { Videogame } = require('../../db');
const { Op } = require('sequelize');

async function filterByReleaseDate(req, res, next) {
  const { startDate, endDate } = req.query;
  
  if (isNaN(new Date(startDate)) || isNaN(new Date(endDate))) {
    return res.status(400).json({ message: 'Invalid date format' });
  }

  try {
    const gamesByDate = await Videogame.findAll({
      where: {
        releaseDate: {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        }
      }
    });

    res.json(gamesByDate);
  } catch (err) {
    next(err);
  }
}

module.exports = filterByReleaseDate;
