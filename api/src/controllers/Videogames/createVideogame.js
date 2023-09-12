const { Videogame} = require('../../db');

async function createVideogame(req, res, next) {
  const videogameData = req.body;
  try {
    const newVideogame = await Videogame.create(videogameData);
    res.json(newVideogame);
  } catch (err) {
    next(err);
  }
}

module.exports = createVideogame;