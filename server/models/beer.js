'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Beer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Beer.init({
    name: {
      type:DataTypes.STRING,
      allowNull: true,
    },
    tagline: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    wish: {
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    abv: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ibu: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ebc: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }

  }, {
    sequelize,
    modelName: 'Beer',
    tableName: 'beers'
  });
  return Beer;
};