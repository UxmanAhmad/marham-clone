const express = require('express')
const { signUp, verifyOtp } = require('../controllers/userController')

const router = express.Router()

router.route('/user/signup').post(signUp)
router.route('/user/signup/verify').post(verifyOtp)


module.exports = router