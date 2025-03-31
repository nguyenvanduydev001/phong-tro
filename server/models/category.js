'use strict';
const {
  Model
} = require('sequelize');
const slugify = require('slugify')
const { v4 } = require('uuid')
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    slug: {
      type: DataTypes.STRING,
      set(value) {
        return this.setDataValue('slug', '/' + slugify(value))
      }
    },
    text: DataTypes.STRING,
    subText: DataTypes.STRING,
    value: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Category',
  });

  return Category;
};