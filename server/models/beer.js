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
    static associate({User, Pub, Tagging}) {
      this.belongsTo(User, {foreignKey: 'userId', as: 'user'});
      this.belongsToMany(Pub, { through: Tagging, as: 'pubs' });
    }
  }
  Beer.init({
    name: {
      type:DataTypes.STRING,
      allowNull: true,
    },
    counter: {
      type: DataTypes.INTEGER,
      defaultValue: 1
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
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    ibu: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ebc: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    bid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    userId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Beer',
    tableName: 'beers'
  });
  return Beer;
};