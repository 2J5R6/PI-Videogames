const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, PORT } = process.env;
//Modelos
const VideogameModel = require('./models/Videogame');
const GenreModel = require('./models/Genre');

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${PORT}/pi_videogames`, {
  logging: false,
  native: false,
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });


const Videogame = VideogameModel(sequelize);
const Genre = GenreModel(sequelize);

// Videogame.belongsToMany(Genre, { through: 'videogame_genre' });
// Genre.belongsToMany(Videogame, { through: 'videogame_genre' });

module.exports = {
  Videogame,
  Genre,
  conn: sequelize,
};
