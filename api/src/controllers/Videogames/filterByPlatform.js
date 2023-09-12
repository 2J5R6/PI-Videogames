const { Videogame } = require('../../db');
const { Op } = require('sequelize');


async function filterByPlatform(req, res, next) {
  const { platform } = req.query; // Extraer la plataforma de la consulta

  try {
    const gamesByPlatform = await Videogame.findAll({
      where: {
        platforms: {
          [Op.contains]: [platform]
        }
      }
    });

    res.json(gamesByPlatform);
  } catch (err) {
    next(err);
  }
}

module.exports = filterByPlatform;
