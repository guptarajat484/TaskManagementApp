const express = require('express')
const router = express.Router()
const {loginvalidation,signupvalidation} = require('../middlewares/user-module-validation')
const {signup, login} = require('../controllers/user-controller')

router.post('/user/signup',signupvalidation,signup)

router.post('/user/login',loginvalidation,login)

module.exports = router




