require("dotenv").config()

const password = process.env.DB_PASSWORD || null
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: password,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
  },
}
