const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // Definición del modelo Genre
  const Genre = sequelize.define('genre', {
    // ID como identificador primario
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // Nombre del género
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Garantiza que el nombre del género sea único
      validate: {
        notEmpty: true,
      },
    },
  }, { timestamps: false });

  // Hook para validar antes de guardar en la base de datos
  Genre.addHook('beforeValidate', (genre, options) => {
    if (!genre.name) {
      throw new Error('El campo nombre es obligatorio');
    }
  });

  return Genre;
};
