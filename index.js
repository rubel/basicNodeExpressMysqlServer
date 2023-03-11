const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ msg: 'Endpoint Is Working!!' });
});

const blogRouter = require('./api/blog/blog.router');
const userRouter = require('./api/user/user.router');

app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

app.listen(3000, () => {
  console.log('SERVER IS UP & RUNNING');
});
