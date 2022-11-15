'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('kolams', {
      kolam_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      air_id: {
        type: Sequelize.INTEGER
      },
      ikan_id: {
        type: Sequelize.INTEGER
      },
      timer_id: {
        type: Sequelize.INTEGER
      },
      jumlah_lele: {
        type: Sequelize.INTEGER
      },
      berat_rata: {
        type: Sequelize.FLOAT
      },
      luas_kolam: {
        type: Sequelize.FLOAT
      },
      jumlah_pangan: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('kolams');
  }
};