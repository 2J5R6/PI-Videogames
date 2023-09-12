const axios = require('axios');
require('dotenv').config();

const { API_KEY } = process.env;

async function filterByDeveloper(req, res, next) {
    const developer = req.query.developer;

    if (!developer) {
        return res.status(400).send("El parámetro 'developer' es necesario.");
    }

    try {
        const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
        const allGames = response.data.results;

        const filteredGames = allGames.filter(game => {
            return game.developers && game.developers.some(dev => dev.name.toLowerCase() === developer.toLowerCase());
        });

        if (filteredGames.length === 0) {
            return res.status(404).send("No se encontraron videojuegos para el desarrollador especificado.");
        }

        res.json(filteredGames);
    } catch (err) {
        next(err);
    }
}

module.exports = filterByDeveloper;
