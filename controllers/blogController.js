const Blog = require('../models/blog.js');
const express = require('express');

const blog_index = (req, res) => {
    // find blogs object from db and sort it by time descending
    Blog.find().sort({createdAt: -1})
        .then(result => {
            // render to index.ejs and assign blog variable to result
            res.render("index", {title: "All blogs", blogs: result});
        })
        .catch(err => console.log(err));
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => {
            res.redirect("/blogs");
        })
        .catch(err => console.log(err))
}

const blog_create_get = (req, res) => {
    res.render("create", { title: "Create" });
}

const blog_details_get = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render("details", {title: "Details", blog: result})
        })
        .catch(err => console.log(err))

}

const blog_details_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: "/blogs"})
        })
        .catch(err => console.log(err));
}

module.exports = {
    blog_index,
    blog_create_post,
    blog_create_get,
    blog_details_get,
    blog_details_delete
}