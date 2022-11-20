// declare mongoose and Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create new blog schema
const blogSchema = new Schema({
    title: {
        type: String,
        required: true                                                                                                                                  
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;