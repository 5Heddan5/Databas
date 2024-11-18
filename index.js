//Import express in to our application
const express = require("express");

// This is how you import stuff from other files. "./" means that w are looking for something inside the same folder as this file (index.js)
const blogPost = require("./data.js");

console.log(blogPost);

const app = express ();

app.listen(3000, () => {
    console.log("Server is listening to port 3000");
});