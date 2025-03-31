const router = require("express").Router()
const postCtrls = require("../controllers/post")
const joi = require("joi")
const validate = require("../middleware/validation")
const { stringReq, numberReq, arrayReq, string } = require("../middleware/joiSchema")
const { verifyToken, isAdmin } = require("../middleware/verifyToken")

router.post(
  "/new",
  verifyToken,
  validate(
    joi.object({
      title: stringReq,
      address: stringReq,
      category: numberReq,
      description: stringReq,
      price: numberReq,
      postedBy: numberReq,
      target: stringReq,
      images: arrayReq,
      area: numberReq,
    })
  ),
  postCtrls.createNewPost
)
router.post(
  "/expired/",
  verifyToken,
  validate(
    joi.object({
      pid: numberReq,
      price: numberReq,
      days: numberReq,
      status: string,
    })
  ),
  postCtrls.createRequestRequired
)
router.post(
  "/ratings/:postId",
  verifyToken,
  validate(joi.object({ content: string, score: numberReq })),
  postCtrls.rating
)
router.get("/expired/", verifyToken, isAdmin, postCtrls.getExpireds)
router.get("/", postCtrls.getPosts)
router.get("/:pid", postCtrls.getPostById)
router.put(
  "/expired/:expiredId",
  verifyToken,
  isAdmin,
  validate(joi.object({ status: stringReq, pid: numberReq, days: numberReq })),
  postCtrls.updateExpired
)
router.put("/wishlist/:pid", verifyToken, postCtrls.updateWishlist)
router.put("/:pid", verifyToken, postCtrls.updatePost)
router.delete("/:pid", verifyToken, postCtrls.deletePost)
router.delete("/expired/:expiredId", verifyToken, isAdmin, postCtrls.deleteExpired)

module.exports = router
