const express = require('express')
const { body } = require('express-validator')
const fetchUser = require('../middleware/fetchUser')

const router = express.Router()

// @Endpoint: /api/auth/createUser
// @data: body({name, email, password})
// @access: public
// @desc: create a new user
router.post('/createuser', body('email').isEmail(), body('password').isStrongPassword(), require('./auth/CreateUser'))

// @Endpoint: /api/auth/loginUser
// @data: body({ email, password})
// @access: public
// @desc: login a user
router.post('/loginuser', body('email').isEmail(),body('password').isStrongPassword(), require('./auth/loginUser'))

// @Endpoint: /api/auth/loginUser
// @data: header({ authToken})
// @access: loggedin User
// @desc: gives details about the loggedin user
router.get('/getUser',fetchUser ,require('./auth/getUser'))

module.exports = router;