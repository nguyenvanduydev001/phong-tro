"use strict"

const { postData } = require("../ultils/constants")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Posts", postData, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Posts", null, {})
  },
}
