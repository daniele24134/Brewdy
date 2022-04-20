'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Beers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
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
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('Beers');
  }
};