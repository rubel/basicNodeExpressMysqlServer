const {
  create,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require('./blog.service');

module.exports = {
  createBlog: (req, res) => {
    create(req, (error, results) => {
      if (error) {
        return res.status(201).json({
          success: 0,
          error: error,
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getAllBlogs: (req, res) => {
    getBlogs(req.body, (error, results) => {
      if (error) {
        return res.status(201).json({
          success: 0,
          error: error,
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getBlogById: (req, res) => {
    const id = req.params.id;
    getBlogById(id, (error, results) => {
      if (error) {
        return res.status(201).json({
          success: 0,
          error: error,
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  updateBlog: (req, res) => {
    updateBlog(req, (error, results) => {
      if (error) {
        return res.status(201).json({
          success: 0,
          error: error,
        });
      }
      res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  deleteBlog: (req, res) => {
    const { id } = req.body;
    deleteBlog(id, (error, results) => {
      if (error) {
        return res
          .status(201)
          .json({ msg: 'could not delete blog', error: error });
      }
      return res
        .status(200)
        .json({ msg: 'successfully deleted blog', data: results });
    });
  },
};
