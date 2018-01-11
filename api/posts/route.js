
const express = require('express');
const router = express.Router();
const postsController = require('./controller');
const authGuard = require('../global-service').globalVariable.authGuard;


router.get('/get', postsController.getPosts);
router.get('/get/:_id', postsController.getPost);
router.post('/add', authGuard, postsController.addPost);
router.delete('/delete', postsController.deletePosts)
// router.put('update',postsController.updatePost)



module.exports = router;
