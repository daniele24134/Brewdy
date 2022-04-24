'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tagging extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Pub, Beer }) {
      this.belongsTo(Pub, {foreignKey: 'PubId'});
      this.belongsTo(Beer, {foreignKey: 'BeerId'});
    }
  }
  Tagging.init({
    PubId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    BeerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Tagging',
    tableName: 'taggings'
  });
  return Tagging;
};