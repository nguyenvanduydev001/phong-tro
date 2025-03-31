const router = require("express").Router()
const commentCtrls = require("../controllers/comment")
const joi = require("joi")
const validate = require("../middleware/validation")
const { stringReq, numberReq, number } = require("../middleware/joiSchema")
const { verifyToken } = require("../middleware/verifyToken")

router.post(
  "/",
  verifyToken,
  validate(joi.object({ content: stringReq, pid: numberReq, parentComment: number })),
  commentCtrls.createComment
)
router.get("/:pid", commentCtrls.getCommentsByPostId)

module.exports = router
