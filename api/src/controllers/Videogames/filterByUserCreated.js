const { Videogame } = require('../../db');

async function filterByUserCreated(req, res, next) {
  try {
    const userCreatedGames = await Videogame.findAll({
      where: {
        userCreated: true
      }
    });

    res.json(userCreatedGames);
  } catch (err) {
    next(err);
  }
}

module.exports = filterByUserCreated;
