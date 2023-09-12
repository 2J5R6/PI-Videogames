const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Videogame = sequelize.define('videogame', {
    // ID como identificador primario
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    // Nombre del videojuego
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    // Descripción del videojuego
    description: {
      type: DataTypes.TEXT,
      allowNull: true,  // Permitir valores nulos
      validate: {
        notEmpty: true,  // No permitir cadenas vacías
        len: [0, 2000]   // Limitar la longitud de la descripción a 2000 caracteres
      },
    },
    // Plataformas en las que está disponible el videojuego
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    // Fecha de lanzamiento del videojuego
    releaseDate: {
      type: DataTypes.DATE,
    },
    // Calificación del videojuego
    rating: {
      type: DataTypes.FLOAT,
    },
    // Desarrollador del videojuego
    developer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Indica si el videojuego fue creado por el usuario o proviene de la API
    userCreated: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    videoClip: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,     // Verifica que sea una URL válida
        len: [0, 500]    // Limitar la longitud de la URL a 500 caracteres
      },
      allowNull: true,
    },
    // URL de la imagen del videojuego
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true, // Verifica que sea una URL válida
      },
      defaultValue: 'https://i.blogs.es/7796de/portada-xbox/840_560.jpeg' // URL predeterminada si no se proporciona una
    },
  }, { timestamps: false });

  // // Hook para validar antes de guardar en la base de datos
  // Videogame.addHook('beforeValidate', (videogame, options) => {
  //   if (!videogame.name || !videogame.description || !videogame.platforms) {
  //     throw new Error('Los campos nombre, descripción y plataformas son obligatorios');
  //   }
  // });

  return Videogame;
};
