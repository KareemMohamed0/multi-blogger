const express = require('express');
const router = express.Router();
const userController = require('./controller');
const passport = require('passport');

let authGuard = passport.authenticate('jwt', { session: false })

router.post('/register', userController.register);
router.post('/authenticate', userController.authenticate);
router.get('/demo', authGuard, userController.demoProfile);
router.get('/users', userController.resturnAllusers);
router.get('/now', userController.returnCurrentUser);




module.exports = router;