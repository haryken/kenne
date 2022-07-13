const express = require('express');
const asyncHandler = require('express-async-handler');
const postsController = require('../../../controllers/posts.controller');
const { validateCreatePost } = require('../../../validations/post.validation');

const router = express.Router();

router.get('/', asyncHandler(postsController.findPostsHandler));

router.get('/:id', asyncHandler(postsController.getPostHandler));

router.post('/', validateCreatePost, asyncHandler(postsController.createPostHandler));

router.put('/:id', validateCreatePost, asyncHandler(postsController.updatePostHandler));

router.delete('/:id', asyncHandler(postsController.deletePostHandler));

module.exports = router;
