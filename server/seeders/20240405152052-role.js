"use strict"

const { roles } = require("../ultils/constants")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Roles", roles, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {})
  },
}
