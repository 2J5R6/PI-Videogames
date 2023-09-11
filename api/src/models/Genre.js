const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Genre = sequelize.define('genre', {

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
  }, { timestamps: false });

  Genre.addHook('beforeValidate', (genre, options) => {
    if (!genre.name) {
      throw new Error('El campo nombre es obligatorio');
    }
  });

  return Genre;
  
};