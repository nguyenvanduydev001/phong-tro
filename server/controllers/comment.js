const db = require("../models")
const asyncHandler = require("express-async-handler")

const createComment = asyncHandler(async (req, res) => {
  const { uid } = req.user
  const response = await db.Comment.create({ ...req.body, uid })
  return res.json({
    success: response ? true : false,
    mes: response ? "Created." : "Có lỗi.",
  })
})
const getCommentsByPostId = asyncHandler(async (req, res) => {
  const { pid } = req.params
  const response = await db.Comment.findAll({
    where: { pid },
    include: [
      {
        model: db.User,
        attributes: ["avatar", "name", "role"],
        as: "commentator",
        include: [{ model: db.Role, attributes: ["value"], as: "roleData" }],
      },
    ],
    order: [["createdAt", "ASC"]],
  })
  return res.json({
    success: response ? true : false,
    comments: response,
  })
})
module.exports = {
  createComment,
  getCommentsByPostId,
}
