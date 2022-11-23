const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// express app
const app = express();

// connect to mongodb
// change the password!!!
const dbURI = "mongodb+srv://admin:<password>@cluster0.lap7tws.mongodb.net/test?retryWrites=true&w=majority";
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

// redirect to /blogs
app.get("/", (req, res) => {
    res.redirect("/blogs")
});

// blogRoutes
app.use("/", blogRoutes);

// about page
app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

// 404 page not found
app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
})


