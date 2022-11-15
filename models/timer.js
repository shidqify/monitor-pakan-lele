'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class timer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      timer.hasMany(models.kolam, { foreignKey: "timer_id" });
    }
  }
  timer.init({
    timer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    waktu: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'timer',
  });
  return timer;
};