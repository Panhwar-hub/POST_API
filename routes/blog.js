const express = require('express');
const router = express.Router();
const postController = require('../controllers/blog');
const auth = require('../middleware/post')

router.get('/fetch',postController.getAllPosts)
router.post('/posts',auth, postController.createPost);
router.post('/comments',auth, postController.addComment);
router.post('/replies',auth, postController.addReply);

router.get('/fetch',postController.getAllPosts)
router.post('/posts', postController.createPost);
router.post('/comments', postController.addComment);
router.post('/replies', postController.addReply);


module.exports = router;
