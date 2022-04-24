'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('taggings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      PubId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      BeerId: {
        type: DataTypes.INTEGER,
        allowNull: false
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
    await queryInterface.dropTable('taggings');
  }
};