const express = require('express');
const router = express.Router();

const {getAllPost, getAllComment, createPost, postLike, postComment} = require('../controllers/postControllers') // controllers

router.get('/getAllPost',getAllPost);
router.get('/getAllComment/:postId',getAllComment);

router.post('/createPost/:userId',createPost);
router.post('/postLike/:postId',postLike);
router.post('/getAllComment/:postId',postComment);


module.exports = router;