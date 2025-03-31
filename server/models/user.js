"use strict"
const { Model } = require("sequelize")
const bcrypt = require("bcryptjs")

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, { foreignKey: "role", targetKey: "code", as: "roleData" })
      User.hasMany(models.Post, { foreignKey: "postedBy", targetKey: "id", as: "author" })
      User.hasMany(models.Wishlist, { foreignKey: "uid", as: "wishlistData" })
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("password", hashPassword(value))
        },
      },
      avatar: DataTypes.STRING,
      role: DataTypes.STRING,
      isBlocked: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  )

  return User
}
