const { Router } = require('express');

const router = Router();

// Importación de controladores
const { 
  getAllVideogames, 
  getVideogameById, 
  getVideogamesByName, 
  createVideogame,
  filterByGenre,
  filterByPlatform,
  filterByReleaseDate,
  filterByRating,
  filterByDeveloper,
  filterByUserCreated,
  orderBy
} = require('../controllers/Videogames/Videogames');

const getAllGenres = require('../controllers/Genres/getAllGenres');
  
// Rutas para videogames
router.get('/videogames', getAllVideogames);
router.get('/videogames/name', getVideogamesByName);
router.get('/videogames/:idVideogame', getVideogameById);
router.post('/videogames', createVideogame);
  
// Rutas para genres
router.get('/genres', getAllGenres);

// Rutas para filtrar y ordenar videojuegos
router.get('/videogames/filter/platform', filterByPlatform);
router.get('/videogames/filter/genre', filterByGenre);
router.get('/videogames/filter/releaseDate', filterByReleaseDate);
router.get('/videogames/filter/rating', filterByRating);
router.get('/videogames/filter/developer', filterByDeveloper); // Añadido
router.get('/videogames/filter/userCreated', filterByUserCreated);
router.get('/videogames/order', orderBy);

module.exports = router;
