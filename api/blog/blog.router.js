const { checkToken } = require('../auth/checkToken');
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require('./blog.controller');

const router = require('express').Router();

router.post('/', checkToken, createBlog);
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.patch('/', checkToken, updateBlog);
router.delete('/', checkToken, deleteBlog);

module.exports = router;
