// Import express in to our application
const express = require("express");

// This is how you import stuff from other files. "./" means that we are looking for something inside the same folder as this file (index.js)
let { blogPost } = require("./data.js");

// Creates the server by invoking the express function and assigning it to the app
const app = express();

app.use(express.json());

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

// Endpoint for creating new blog post and add it to the blogPost-array

app.post("/blog-posts", (req, res) => {
  // This request needs a body object that contains the information about the blog post that the server should create
  const body = req.body;

  // Eller if (!body)
  if (body === undefined) {
    return res.status(400).json({ message: "The body is missing." });
  }

  const content = body.content;
  const newId = blogPost.length + 1;

  const newBlogPost = {
    id: newId,
    content,
  };

  blogPost.unshift(newBlogPost);
  return res.status(201).json({ message: "The new blogPost was created" });
});

app.put("/blog-posts/:id", (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (content === undefined) {
    return res.status(400).json({ message: "The body is missing" });
  }

  const blog = blogPost.find((bp) => bp.id === id);

  if (!blog) {
    return res
      .status(400)
      .json({ message: "The blog with that id was not found" });
  }

  blog.content = content;

  return res.json(blog);
});

app.delete("/blog-posts/:id", (req, res) => {
  const { id } = req.params;
  const blog = blogPost.find((bp) => bp.id === id);

  if (!blog) {
    return res
      .status(400)
      .json({ message: "The blog with that id was not found" });
  }

  blogPost = blogPost.filter((bp) => bp.id!==id)

  return res.json({message: "The blogpost was remove successfully"});
});

app.listen(3000, () => {
  console.log("Server is listening to port 3000");
});
