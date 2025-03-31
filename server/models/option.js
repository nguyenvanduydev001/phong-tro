'use strict';
const { Model } = require('sequelize');
const { v4 } = require('uuid')
module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Option.init({
    value: DataTypes.STRING,
    min: DataTypes.FLOAT,
    max: DataTypes.FLOAT,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Option',
  });
  return Option;
};