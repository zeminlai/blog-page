const express = require('express');
const router = express.Router();
const Blog = require('../models/blog.js');
const blogController = require('../controllers/blogController');

router.get("/blogs", blogController.blog_index);

// handle POST request from /blogs/create at /blogs
router.post("/blogs", blogController.blog_create_post);

router.get("/blogs/create", blogController.blog_create_get);

// GET page for individual blog
router.get("/blogs/:id", blogController.blog_details_get);

// DELETE by id 
router.delete("/blogs/:id", blogController.blog_details_delete);

module.exports = router;