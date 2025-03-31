"use strict"
const { Model } = require("sequelize")
const { v4 } = require("uuid")
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, { foreignKey: "postedBy", as: "author" })
      Post.belongsTo(models.Category, { foreignKey: "category", as: "cates" })
      Post.hasOne(models.Expired, { foreignKey: "pid", as: "expiredPost" })
      Post.hasMany(models.Rating, { foreignKey: "targetId", as: "votes" })
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      star: DataTypes.FLOAT,
      address: DataTypes.STRING,
      category: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      price: DataTypes.FLOAT,
      postedBy: DataTypes.INTEGER,
      expiredDate: DataTypes.DATE,
      target: {
        type: DataTypes.ENUM,
        values: ["Nam", "Nữ", "Tất cả"],
      },
      images: {
        type: DataTypes.TEXT,
        get() {
          const raw = this.getDataValue("images")
          return raw ? JSON.parse(raw) : []
        },
        set(value) {
          return this.setDataValue("images", JSON.stringify(value))
        },
      },
      area: DataTypes.FLOAT,
      isAvailable: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Post",
    }
  )
  return Post
}
