const database = require('./../config/mysql');

module.exports = {
  create: (req, callback) => {
    const { title, content } = req.body;
    if (!title || !content) {
      return callback({ msg: 'failed to create blog' }, null);
    }
    database.query(
      `INSERT INTO blog (title,content) VALUES (?,?)`,
      [title, content],
      (error, results) => {
        if (error) {
          return callback(error, null);
        }
        return callback(null, {
          msg: 'Blog Created Successfully',
          data: results,
        });
      }
    );
  },
  getBlogs: (req, callback) => {
    database.query(`SELECT * FROM blog`, [], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  },
  getBlogById: (id, callback) => {
    database.query(`SELECT * FROM blog WHERE id=?`, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  },
  updateBlog: (req, callback) => {
    const { id, title, content } = req.body;

    database.query(
      `UPDATE blog SET title=?, content=? WHERE id=?`,
      [title, content, id],
      (error, results) => {
        if (error) {
          return callback({msg: 'could not update blog'}, null);
        }
        return callback(null, results);
      }
    );
  },
  deleteBlog: (id,callback) => {
    database.query(`DELETE FROM blog WHERE id=?`,[id],(error,results)=>{
        if(error){
            return callback(error,null);
        }
        return callback(null,results);
    });
  },
};
