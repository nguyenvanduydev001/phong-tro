"use strict"

const { categories } = require("../ultils/constants")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Categories", categories, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {})
  },
}
