const router = require('express').Router()
const insertCtrls = require('../controllers/insert')
// const joi = require('joi')
// const validate = require('../middleware/validation')
// const { password, stringReq } = require('../middleware/joiSchema')
// const { verifyToken } = require('../middleware/verifyToken')

router.post('/initdata', insertCtrls.initData)
router.post('/mockup', insertCtrls.mockup)

module.exports = router 