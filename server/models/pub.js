'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pub extends Model {

    static associate({ Beer, Tagging, User }) {
      this.belongsToMany(Beer, { through: Tagging, as: 'beers' });
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }

  }
  Pub.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Pub',
    tableName: 'pubs'
  });
  return Pub;
};