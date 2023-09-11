const { Router } = require('express');
// Importar todos los routers;


const router = Router();

// Routers videogames
const { getAllVideogames, getVideogameById, getVideogamesByName, createVideogame } = require('../controllers/Videogames/Videogames');

router.get('/', getAllVideogames);
router.get('/:idVideogame', getVideogameById);
router.get('/name', getVideogamesByName);
router.post('/', createVideogame);

// Routers genres

const getAllGenres  = require('../controllers/Genres/getAllGenres');

router.get('/genres', getAllGenres);

module.exports = router;
