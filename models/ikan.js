'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ikan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ikan.hasMany(models.kolam, { foreignKey: "ikan_id" });
    }
  }
  ikan.init({
    ikan_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    umur: DataTypes.INTEGER,
    berat: DataTypes.FLOAT,
    ukuran: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'ikan',
  });
  return ikan;
};