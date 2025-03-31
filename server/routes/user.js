const router = require("express").Router()
const userCtrls = require("../controllers/user")
const joi = require("joi")
const validate = require("../middleware/validation")
const { password, stringReq, string } = require("../middleware/joiSchema")
const { verifyToken, isAdmin } = require("../middleware/verifyToken")

router.post(
  "/register",
  validate(joi.object({ phone: stringReq, password, name: stringReq })),
  userCtrls.register
)
router.post("/login", validate(joi.object({ phone: stringReq, password })), userCtrls.login)
router.get("/current", verifyToken, userCtrls.getCurrent)
router.put(
  "/current",
  validate(joi.object({ name: string, avatar: string })),
  verifyToken,
  userCtrls.updateProfile
)
router.post("/confirm", verifyToken, userCtrls.checkPassword)
router.post("/send-otp", userCtrls.sendOTP)
router.post("/verify-otp", userCtrls.verifyOTP)
router.put("/change-pass", verifyToken, userCtrls.updatePassword)
router.get("/", verifyToken, isAdmin, userCtrls.getUsers)
router.put("/:uid", verifyToken, isAdmin, userCtrls.updateUser)
router.delete("/:uid", verifyToken, isAdmin, userCtrls.deleteUser)

module.exports = router
