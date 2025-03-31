const router = require("express").Router()
const appCtrls = require("../controllers/app")
const { verifyToken, isAdmin } = require("../middleware/verifyToken")

router.get("/category", appCtrls.getCategories)
router.get("/options", appCtrls.getOptions)
router.get("/roles", appCtrls.getRoles)
router.put("/views", appCtrls.updateViews)
router.get("/dashboard", verifyToken, isAdmin, appCtrls.getDashboard)

module.exports = router
