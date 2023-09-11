const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Videogame = sequelize.define('videogame', {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
   },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Si las plataformas son una lista de strings
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    image: {
      type: DataTypes.STRING, // Si la imagen es una URL
    },
    releaseDate: {
      type: DataTypes.DATE,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
  }, { timestamps: false });

  Videogame.addHook('beforeValidate', (videogame, options) => {
    if (!videogame.name || !videogame.description || !videogame.platforms) {
      throw new Error('Los campos nombre, descripción y plataformas son obligatorios');
    }
  });

  return Videogame;
};
