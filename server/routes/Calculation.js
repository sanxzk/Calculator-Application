const express = require('express');
const fetchUser = require('../middleware/fetchUser.js');

const router = express.Router();

// @Endpoint: /api/calculation/addCalculation
// @data: body({ expression, result}), header({authToken})
// @access: loggedin User
// @desc: add a new calculation in the database
router.post('/addcalculation', fetchUser, require('./calculation/addCalculation.js'))

// @Endpoint: /api/calculation/deleteCalculation
// @data: header({authToken, caculationId})
// @access: loggedin User
// @desc: delete a calculation from the database
router.delete('/deletecalculation',fetchUser, require('./calculation/deleteCalculation.js'))

// @Endpoint: /api/calculation/getAllCalculations
// @data: header({authToken})
// @access: loggedin User
// @desc: gives all the calculations from the database
router.get('/getallCalculations',fetchUser, require('./calculation/getAllCalculations.js'))

// @Endpoint: /api/calculation/deleteAllCalculations
// @data: header({authToken})
// @access: loggedin User
// @desc: deletes all the calculations from the database
router.delete('/deleteAllCalculations', fetchUser, require('./calculation/deleteAllCalculations.js'))
module.exports = router;