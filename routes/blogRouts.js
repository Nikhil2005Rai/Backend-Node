const express = require('express');
const Blog = require('./../models/blog');

const router = express.Router();

router.get('/', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', {
        title: 'All Blogs',
        blogs: result
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/', (req, res) => {
  const blog = new Blog(req.body);

  blog.save()
    .then(() => {
      res.redirect(`/blogs/${blog._id}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render('details', {
        blog: result,
        title: 'Blog Details'
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then(() => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router; 
