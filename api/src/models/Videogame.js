const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // Definición del modelo Videogame
  const Videogame = sequelize.define('videogame', {
    // UUID como identificador primario para garantizar la unicidad
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // Nombre del videojuego
    name: {
      type: DataTypes.STRING,
      unique: true, // Garantiza que el nombre del videojuego sea único
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    // Descripción del videojuego
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    // Plataformas en las que está disponible el videojuego
    parent_platforms: {
      type: DataTypes.ARRAY(DataTypes.ENUM('Xbox', 'PlayStation', 'PC', 'Android', 'Nintendo')),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    // URL de la imagen del videojuego
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true, // Verifica que sea una URL válida
      },
      defaultValue: 'https://i.blogs.es/7796de/portada-xbox/840_560.jpeg' // URL predeterminada si no se proporciona una
    },
    // Fecha de lanzamiento del videojuego
    releaseDate: {
      type: DataTypes.DATE,
    },
    // Calificación del videojuego
    rating: {
      type: DataTypes.FLOAT,
    },
    // Indica si el videojuego fue creado por el usuario o proviene de la API
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, { timestamps: false });

  // Hook para validar antes de guardar en la base de datos
  Videogame.addHook('beforeValidate', (videogame, options) => {
    if (!videogame.name || !videogame.description || !videogame.parent_platforms) {
      throw new Error('Los campos nombre, descripción y plataformas son obligatorios');
    }
  });

  return Videogame;
};
