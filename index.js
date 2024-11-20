// ########## Get all the packages and data we need ##########

// Imports express in to our application. This path doesn't have any periodes or slashes, it means that it looks for something inside node_modules.
const express = require("express");

// Import the controller methods from blog.controller.js
const {
  deletePost,
  getAllPosts,
  getPostById,
  postPost,
  putPost,
} = require("./blog.controller.js");

// This how you import stuff from other files. "./" means that we are looking for something inside the same folder as this file (index.js). This is called a relative path,it originates from the file we are currently in.
let { blogPosts } = require("./data.js");

// ########## Create the server, and configure it. ##########

// Creates the server by invoking the express function and assigning it to the app variable.
const app = express();

// Parse the body object so it's available on the req object.
app.use(express.json());

// ########## Endpoints ##########

app.get("/posts", getAllPosts);
app.get("/posts/:id", getPostById);
app.post("/posts", postPost);
app.put("/posts/:id", putPost);

app.delete("/posts/:id", deletePost)

// ########## Start the server ##########

// Starts the server and configure which port it is listening to. Now it's ready to handle incoming requests. This line of code is usually at the bottom of the file.
app.listen(3000, () => {
  console.log("Server is listening to port 3000");
});
