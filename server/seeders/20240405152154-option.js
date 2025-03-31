"use strict"

const { priceOptions, areaOptions } = require("../ultils/constants")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Options", [...priceOptions, ...areaOptions], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Options", null, {})
  },
}
