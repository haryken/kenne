const { Posts } = require('../models');

const findPosts = async () => {
  const posts = await Posts.findAll();

  return posts;
};

const getPost = async (id) => {
  const post = await Posts.findByPk(id);

  return post;
};

const createPost = async (newPost) => {
  const { title, postText, imageURL } = newPost;
  const createdPost = await Posts.create({
    title,
    postText,
    imageURL,
  });

  return createdPost;
};

const updatePost = async (id, modifiedPost) => {
  let post = await getPost(id);
  const { title, postText, imageURL } = modifiedPost;

  post.title = title;
  post.postText = postText;
  post.imageURL = imageURL;

  await post.save();

  post = await getPost(id);

  return post;
};

const deletePost = async (id) => {
  const post = await getPost(id);
  await post.destroy();

  return post;
};

module.exports = {
  findPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
