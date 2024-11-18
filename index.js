// Import express in to our application
const express = require("express");

// This is how you import stuff from other files. "./" means that we are looking for something inside the same folder as this file (index.js)
const { blogPost } = require("./data.js");

// Creates the server by invoking the express function and assigning it to the app
const app = express();

// Endpoint for getting all the blog post
app.get("/blog-posts", (req, res) => {
  res.json(blogPost);
});

// Endpoint for getting a blogPost by id
app.get("/blog-posts/:id", (req, res) => {
  const params = req.params;
  const id = params.id;

  // Destructed alternative to get the id
  // const {id} = req.params;

  // Find is an array method, that loops through the array pn which it is invoked on.
  const blog = blogPost.find((bp) => {
    if (bp.id === id) {
      return true;
    }

    return false;
  });

  if (blog) {
    return res.json(blog);
  }

  return res
    .status(404)
    .json({ message: "The blog with that id was not found" });
});

app.listen(3000, () => {
  console.log("Server is listening to port 3000");
});
