'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('beers', {
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
        type: DataTypes.FLOAT,
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
      userId: DataTypes.INTEGER,
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
    await queryInterface.dropTable('beers');
  }
};