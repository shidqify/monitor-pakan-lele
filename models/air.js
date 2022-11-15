'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class air extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      air.hasMany(models.kolam, { foreignKey: "air_id" });
    }
  }
  air.init({
    air_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    ph_air: DataTypes.FLOAT,
    kadar_air: DataTypes.INTEGER,
    warna_air: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'air',
  });
  return air;
};