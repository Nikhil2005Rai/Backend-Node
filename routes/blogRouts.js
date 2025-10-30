const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// All blogs
router.get('/', blogController.blog_index);

// Create new blog (GET form)
router.get('/create', blogController.blog_create_get);

// Create new blog (POST data)
router.post('/', blogController.blog_create_post);

// View single blog
router.get('/:id', blogController.blog_details);

// Delete blog
router.delete('/:id', blogController.blog_delete);

module.exports = router;
