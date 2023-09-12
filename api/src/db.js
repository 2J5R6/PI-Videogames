const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, PORT } = process.env;

// Importación de modelos
const VideogameModel = require('./models/Videogame');
const GenreModel = require('./models/Genre');

// Conexión a la base de datos
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${PORT}/pi_videogames`, {
  logging: false,
  native: false,
});

// Autenticación a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

// Inicialización de modelos
const Videogame = VideogameModel(sequelize);
const Genre = GenreModel(sequelize);

// Relaciones (comentadas por ahora)
Videogame.belongsToMany(Genre, { through: 'videogame_genre' });
Genre.belongsToMany(Videogame, { through: 'videogame_genre' });

module.exports = {
  Videogame,
  Genre,
  conn: sequelize,
};
