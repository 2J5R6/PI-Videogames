const getAllVideogames = require('./getAllVideogames');
const getVideogameById = require('./getVideogameById');
const getVideogamesByName = require('./getVideogameByName');
const createVideogame = require('./createVideogame');
const filterByGenre = require('./filterByGenre');
const filterByPlatform = require('./filterByPlatform');
const filterByReleaseDate = require('./filterByReleaseDate');
const filterByRating = require('./filterByRating');
const filterByUserCreated = require('./filterByUserCreated');
const filterByDeveloper = require('./filterByDeveloper')
const orderBy = require('./orderBy');

module.exports = {
  getAllVideogames,
  getVideogameById,
  getVideogamesByName,
  createVideogame,
  filterByGenre,
  filterByPlatform,
  filterByReleaseDate,
  filterByRating,
  filterByUserCreated,
  filterByDeveloper,
  orderBy
};
