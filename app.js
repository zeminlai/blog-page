const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// express app
const app = express();

// connect to mongodb
const dbURI = "mongodb+srv://admin:laizemin426@cluster0.lap7tws.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(dbURI)
    // listen to port 8080 if connected to db
    .then(console.log("connected to database"))
    .then(result => app.listen(8080))
    .catch(err => console.log(err))

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));
//mongoose and mongo sandbox routes

// // saving blog to db
// app.get("/add-blog", (req, res) => {
//     const blog = new Blog({
//         title: "new blog 2",
//         snippet: "testing mongoose",
//         body: "currently testing mongoose blog lol"
//     });
//     // save to database
//     blog.save()
//         .then(result => {
//             // display the result
//             res.send(result);
//         })
//         .catch(err => {
//             console.log(err);
//         })
// })

// // retrieving blog from db
// app.get("/all-blogs", (req, res) => {
//     Blog.find()
//         .then(result => {
//             res.send(result)
//         })
//         .catch(err => console.log(err))
// })

// // retrieving single blog from db
// app.get("/single-blog", (req, res) => {
//     Blog.findById("63771ee9c3a50ac05174967a")
//         .then(result => res.send(result))
//         .catch(err => console.log(err))
// })

// redirect to /blogs
app.get("/", (req, res) => {
    res.redirect("/blogs")
});

// display all blogs at /blogs
app.get("/blogs", (req, res) => {
    // find blogs object from db and sort it by time descending
    Blog.find().sort({createdAt: -1})
        .then(result => {
            // render to index.ejs and assign blog variable to result
            res.render("index", {title: "All blogs", blogs: result});
        })
        .catch(err => console.log(err));
});

// handle POST request from /blogs/create at /blogs
app.post("/blogs", (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => {
            res.redirect("/blogs");
        })
        .catch(err => console.log(err))
})


app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "Create" });
});

// GET page for individual blog
app.get("/blogs/:id", (req, res) => {
    const id = req.params.id;
        Blog.findById(id)
            .then(result => {
                res.render("details", {title: "Details", blog: result})
            })
            .catch(err => console.log(err))
})

// DELETE by id 
app.delete("/blogs/:id", (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: "/blogs"})
        })
        .catch(err => console.log(err));
})

// 404 page not found
app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
})

