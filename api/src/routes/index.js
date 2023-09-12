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

// Rutas para genres
router.get('/genres', getAllGenres);

// Rutas para videogames
router.get('/videogames/name', getVideogamesByName); // Buscar videojuegos por nombre
router.get('/videogames/order', orderBy); // Ordenar videojuegos
router.get('/videogames/:idVideogame', getVideogameById); // Obtener videojuego por ID
router.post('/videogames', createVideogame); // Crear un videojuego

// Rutas para filtrar y ordenar videojuegos
router.get('/videogames/filter/platform', filterByPlatform); // Filtrar por plataforma
router.get('/videogames/filter/genre', filterByGenre); // Filtrar por género
router.get('/videogames/filter/releaseDate', filterByReleaseDate); // Filtrar por fecha de lanzamiento
router.get('/videogames/filter/rating', filterByRating); // Filtrar por rating
router.get('/videogames/filter/developer', filterByDeveloper); // Filtrar por desarrollador
router.get('/videogames/filter/userCreated', filterByUserCreated); // Filtrar por videojuegos creados por el usuario

// Ruta para obtener todos los videojuegos (debe estar al final para evitar conflictos con las rutas anteriores)
router.get('/videogames', getAllVideogames);

module.exports = router;
