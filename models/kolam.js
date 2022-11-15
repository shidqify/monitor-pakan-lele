'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kolam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  kolam.init({
    kolam_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    air_id: DataTypes.INTEGER,
    ikan_id: DataTypes.INTEGER,
    timer_id: DataTypes.INTEGER,
    jumlah_lele: DataTypes.INTEGER,
    berat_rata: DataTypes.FLOAT,
    luas_kolam: DataTypes.FLOAT,
    jumlah_pangan: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'kolam',
  });
  return kolam;
};