const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {

  // Lodash
  const num = _.random(0, 10);
  console.log(num);

  const greet = _.once(() => {
    console.log("Hello");
  })

  greet();
  // Set header content type
  res.setHeader("Content-Type", "text/html");

  let path = "./views";
  switch(req.url) {
    case "/":
      path += "/index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "/about.html";
      res.statusCode = 200;
      break;
    case "/aboutlol":
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;
    default:
      path += "/404.html";
      res.statusCode = 404;
      break;
  }
  // Send an html file
  fs.readFile(path,(err, data) => {
    if (err) {
      console.log(err);
      res.end();
    }
    else{
      res.end(data);
    }
  });
});

// Listen for request on port 3000
server.listen(3000, "localhost", ()=> {
  console.log("\nlistening for request on port 3000\n");
});
