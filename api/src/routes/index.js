const { Router } = require('express');

const router = Router();

// Importación de controladores
const { 
    getAllVideogames, 
    getVideogameById, 
    getVideogamesByName, 
    createVideogame 
  } = require('../controllers/Videogames/Videogames');
  
  const getAllGenres = require('../controllers/Genres/getAllGenres');
  
  // Rutas para videogames
  router.get('/videogames', getAllVideogames);
  router.get('/videogames/:idVideogame', getVideogameById);
  router.get('/videogames/name', getVideogamesByName);
  router.post('/videogames', createVideogame);
  
  // Rutas para genres
  router.get('/genres', getAllGenres);

module.exports = router;
