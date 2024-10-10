const express = require('express');
const { getAllPosts, getPostById, createPost, updatePost, deletePost, searchPosts } = require('../controllers/postController');

const router = express.Router();

router.get('/posts/search', searchPosts);

router.get('/posts', getAllPosts);

router.get('/posts/:id', getPostById);

router.post('/posts', createPost);

router.put('/posts/:id', updatePost);

router.delete('/posts/:id', deletePost);

module.exports = router;
