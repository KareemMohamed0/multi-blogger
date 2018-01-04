const express = require('express');
const router = express.Router();
const userController = require('./controller');
const guard = require('./service').vertifyToken;


router.post('/register', userController.register);
router.post('/authenticate', userController.authenticate);
router.get('/demo', guard, userController.demoProfile);
router.get('/users', userController.resturnAllusers);


module.exports = router;