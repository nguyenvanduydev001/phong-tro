const db = require("../models")
const asyncHandler = require("express-async-handler")
const { gennerateAccessToken } = require("../middleware/jwt")
const bcrypt = require("bcryptjs")
const { Sequelize, Op } = require("sequelize")

const accountSid = process.env.TWILLO_ACCOUNT_SSD
const authToken = process.env.TWILLO_AUTH_TOKEN
const serviceSid = process.env.TWILLO_SERVICE_SID
const client = require("twilio")(accountSid, authToken)

const register = asyncHandler(async (req, res) => {
  const { phone } = req.body
  const response = await db.User.findOrCreate({
    where: { phone },
    defaults: req.body,
  })
  return res.json({
    success: response[1] ? true : false,
    mes: response[1] ? "Đăng ký thành công. Hãy đăng nhập" : "SĐT đã được sử dụng.",
  })
})
const login = asyncHandler(async (req, res) => {
  const { phone, password } = req.body
  const user = await db.User.findOne({
    where: { phone },
  })
  if (!user)
    return res.json({
      success: false,
      mes: "SĐT chưa được đăng ký",
    })
  const isCorrectPassword = bcrypt.compareSync(password, user.password)
  const token = isCorrectPassword ? gennerateAccessToken(user.id, user.role) : null
  return res.json({
    success: token ? true : false,
    token: token,
    mes: token ? "Đăng nhập thành công" : "Sai mật khẩu",
  })
})
const getCurrent = asyncHandler(async (req, res) => {
  const { uid } = req.user
  const user = await db.User.findOne({
    where: { id: uid },
    attributes: { exclude: ["password"] },
    include: [
      { model: db.Role, attributes: ["value"], as: "roleData" },
      {
        model: db.Wishlist,
        as: "wishlistData",
        include: [
          {
            model: db.Post,
            as: "postData",
            include: [{ model: db.User, as: "author", attributes: ["name", "phone", "avatar"] }],
          },
        ],
      },
    ],
  })
  return res.json({
    success: user ? true : false,
    user: user,
  })
})
const updateProfile = asyncHandler(async (req, res) => {
  const { uid } = req.user
  const { name, avatar } = req.body
  const user = await db.User.update(
    { name, avatar },
    {
      where: { id: uid },
    }
  )
  return res.json({
    success: user[0] > 0 ? true : false,
    mes: user[0] > 0 ? "Updated." : "Failed.",
  })
})
const checkPassword = asyncHandler(async (req, res) => {
  const { uid } = req.user
  const { password } = req.body
  const user = await db.User.findByPk(uid)
  const isCorrectPassword = bcrypt.compare(password, user?.password)
  return res.json({
    success: isCorrectPassword ? true : false,
    mes: isCorrectPassword ? "Correct Credentials" : "Failed.",
  })
})
const updatePassword = asyncHandler(async (req, res) => {
  const { uid } = req.user
  const { newPassword } = req.body
  const response = await db.User.update({ password: newPassword }, { where: { id: uid } })
  return res.json({
    success: response[0] > 0 ? true : false,
    mes: response[0] > 0 ? "Cập nhật thành công mật khẩu mới" : "Failed.",
  })
})
const getUsers = asyncHandler(async (req, res) => {
  const { limit, page, fields, order, keyword, ...query } = req.query
  const limitQuery = +limit || +process.env.LIMIT
  const offset = +page - 1 || 0
  const offsetQuery = offset * limitQuery
  if (keyword) query[Op.or] = [{ name: { [Op.substring]: keyword } }, { phone: { [Op.substring]: keyword } }]
  const queries = {}
  if (order) queries.order = [order]
  else queries.order = [["createdAt", "DESC"]]
  queries.offset = offsetQuery
  queries.limit = limitQuery
  if (fields) queries.attributes = fields.split(",")
  if (limit === "ALL") {
    const q = {}
    if (fields) q.attributes = fields.split(",")
    const response = await db.User.findAll(q)
    return res.json({
      success: response ? true : false,
      users: response,
    })
  } else {
    const response = await db.User.findAndCountAll({
      where: query,
      ...queries,
      attributes: {
        exclude: ["password"],
      },
      include: [
        { model: db.Role, attributes: ["value"], as: "roleData" },
        { model: db.Post, attributes: ["title"], as: "author" },
      ],
    })
    return res.json({
      success: response ? true : false,
      users: response,
    })
  }
})
const deleteUser = asyncHandler(async (req, res) => {
  const { uid } = req.params
  const response = await db.User.destroy({ where: { id: uid } })
  return res.json({
    success: response > 0 ? true : false,
    mes: response > 0 ? "Deleted." : "Failed.",
  })
})
const updateUser = asyncHandler(async (req, res) => {
  const { uid } = req.params
  const { name, phone, isBlocked, role } = req.body
  const response = await db.User.update({ name, phone, isBlocked, role }, { where: { id: uid } })
  return res.json({
    success: response[0] > 0 ? true : false,
    mes: response[0] > 0 ? "Updated." : "Failed.",
  })
})

// ADD
const sendOTP = asyncHandler(async (req, res) => {
  const { phone } = req.body

  // KT SĐT đã sử dụng
  const user = await db.User.findOne({ where: { phone } })
  if (user)
    return res.json({
      success: false,
      msg: "Số điện thoại đã được đăng ký.",
    })
  await client.verify.v2
    .services(serviceSid)
    .verifications.create({ to: phone, channel: "sms" })
    .then(() => {
      return res.json({
        success: true,
        msg: "Mã OTP đã gửi thành công.",
      })
    })
    .catch((err) => {
      console.log(err)
      return res.json({
        success: false,
        msg: "Mã OTP đã gửi không thành công.",
      })
    })
})

const verifyOTP = asyncHandler(async (req, res) => {
  const { phone, code } = req.body
  const formatPhone = "+84" + parseInt(phone)
  await client.verify.v2
    .services(serviceSid)
    .verificationChecks.create({ to: formatPhone, code })
    .then(async () => {
      return res.json({
        success: true,
        msg: "Xác minh điện thoại thành công.",
      })
    })
    .catch((err) => {
      console.log(err)
      return res.json({
        success: false,
        msg: "Xác minh điện thoại không thành công.",
      })
    })
})

module.exports = {
  register,
  login,
  getCurrent,
  updateProfile,
  checkPassword,
  updatePassword,
  getUsers,
  deleteUser,
  updateUser,
  sendOTP,
  verifyOTP,
}
