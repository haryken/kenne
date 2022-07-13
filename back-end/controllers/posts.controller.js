const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const {
  findPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../services/posts.service');

const findPostsHandler = async (req, res) => {
  const posts = await findPosts();

  return res.status(StatusCodes.OK).json(posts);
};

const getPostHandler = async (req, res, next) => {
  const { id } = req.params;
  const post = await getPost(id);

  if (!post) {
    return next(createError(StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
  }

  return res.status(StatusCodes.OK).json(post);
};

const createPostHandler = async (req, res) => {
  const post = await createPost(req.body);

  return res.status(StatusCodes.CREATED).json(post);
};

const updatePostHandler = async (req, res, next) => {
  const { id } = req.params;
  let post = await getPost(id);

  if (!post) {
    return next(createError(StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
  }

  post = await updatePost(id, req.body);

  return res.status(StatusCodes.OK).json(post);
};

const deletePostHandler = async (req, res, next) => {
  const { id } = req.params;
  let post = await getPost(id);

  if (!post) {
    return next(createError(StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
  }

  post = await deletePost(id);

  return res.status(StatusCodes.OK).json(post);
};

module.exports = {
  findPostsHandler,
  getPostHandler,
  deletePostHandler,
  createPostHandler,
  updatePostHandler,
};
