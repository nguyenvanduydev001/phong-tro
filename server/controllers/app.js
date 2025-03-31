const { Sequelize, Op } = require("sequelize")
const db = require("../models")
const asyncHandler = require("express-async-handler")

const getCategories = asyncHandler(async (req, res) => {
  const response = await db.Category.findAll()
  return res.json({
    success: response ? true : false,
    mes: response ? "Got." : "Có lỗi.",
    categories: response,
  })
})
const getOptions = asyncHandler(async (req, res) => {
  const [prices, areas] = await Promise.all([
    db.Option.findAll({ where: { type: "PRICE" } }),
    db.Option.findAll({ where: { type: "AREA" } }),
  ])
  return res.json({
    success: prices && areas ? true : false,
    mes: prices && areas ? "Got." : "Có lỗi.",
    options: { prices, areas },
  })
})
const getRoles = asyncHandler(async (req, res) => {
  const response = await db.Role.findAll({ raw: true })
  return res.json({
    success: response ? true : false,
    mes: response ? "Got." : "Có lỗi.",
    roles: response,
  })
})
const updateViews = asyncHandler(async (req, res) => {
  const { uid } = req.body
  const response = await db.View.findAll()
  if (response.length === 0) await db.View.create({})
  if (uid) await db.View.increment({ registed: 0.5 }, { where: { id: 1 } })
  else await db.View.increment({ anonymous: 0.5 }, { where: { id: 1 } })
  return res.json({
    success: true,
  })
})
const getDashboard = asyncHandler(async (req, res) => {
  const { days, type, from, to } = req.query
  const daysQuery = days || 220
  const typeDate = type === "month" ? "%m-%y" : "%d-%m-%y"
  const start = from || Date.now() - daysQuery * 24 * 60 * 60 * 1000
  const end = to || Date.now()
  const q = {}
  if (from && to) {
    if (from === to) q.createdAt = { [Op.and]: [{ [Op.gte]: `${from} 00:00:00` }, { [Op.lte]: `${from} 23:59:59` }] }
    else q.createdAt = { [Op.and]: [{ [Op.lte]: `${end} 23:59:59` }, { [Op.gte]: `${start} 00:00:00` }] }
  }
  const [views, expired, posts, users] = await Promise.all([
    db.View.findByPk(1, { attributes: ["anonymous", "registed"], raw: true }),
    db.Expired.findAll({
      where: q,
      raw: true,
      attributes: [
        // [Sequelize.fn("date_format", Sequelize.col("createdAt"), typeDate), "date"],
        [Sequelize.fn("SUM", Sequelize.col("price")), "expiredTotal"],
      ],
      // group: "date",
      // order: [["createdAt", "ASC"]],
    }),
    db.Post.findAll({
      where: q,
      attributes: [
        [Sequelize.fn("date_format", Sequelize.col("createdAt"), typeDate), "date"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "createdPost"],
      ],
      group: "date",
      order: [["createdAt", "ASC"]],
    }),
    db.User.findAll({
      where: q,
      raw: true,
      attributes: [
        // [Sequelize.fn("date_format", Sequelize.col("createdAt"), typeDate), "date"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "createdUser"],
      ],
      // group: "date",
      // order: [["createdAt", "ASC"]],
    }),
  ])
  return res.json({
    success: true,
    data: { ...views, ...expired[0], posts, ...users[0] },
  })
})
module.exports = {
  getCategories,
  getOptions,
  getRoles,
  updateViews,
  getDashboard,
}
