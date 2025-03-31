"use strict"
const { Model } = require("sequelize")
const { v4 } = require("uuid")
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rating.init(
    {
      targetId: DataTypes.INTEGER,
      content: DataTypes.STRING,
      score: DataTypes.FLOAT,
      uid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Rating",
    }
  )
  Rating.beforeCreate(function (model) {
    model.id = v4()
  })
  return Rating
}
