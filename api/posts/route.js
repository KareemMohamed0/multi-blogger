
const express = require('express');
const router = express.Router();
const postsController = require('./controller');


router.get('/get', postsController.getPosts);
router.get('/get/:id', postsController.getPost);
router.post('/add', postsController.addPost);
router.delete('/delete', postsController.deletePosts)



module.exports = router;
