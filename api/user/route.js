const express = require('express');
const router = express.Router();
const userController = require('./controller');
const authGuard = require('../global-service').globalVariable.authGuard;

router.post('/register', userController.register);
router.post('/authenticate', userController.authenticate);
router.get('/profile', authGuard, userController.userProfile);
router.get('/all', userController.resturnAllusers);
router.put('/update', authGuard, userController.updateUserProfile);
router.post('/:id', userController.returnUserById);
router.get('/assignpost', userController.assignPost2user);

module.exports = router;