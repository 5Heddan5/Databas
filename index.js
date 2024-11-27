const express = require("express");
const {
  CheckIfLoggedIn,
  checkIfBodyExist,
  logRequest,
  hashPassword,
} = require("./middleware.js");

const {
  deletePost,
  getAllPosts,
  getPostById,
  postPost,
  postUser,
  putPost,
} = require("./blog.controller.js");

const app = express();

app.use(express.json());
app.use(logRequest);

app.get("/posts",[CheckIfLoggedIn], getAllPosts);
app.get("/posts/:id", getPostById);
app.post("/posts", [CheckIfLoggedIn, checkIfBodyExist], postPost);
app.put("/posts/:id", [CheckIfLoggedIn, checkIfBodyExist], putPost);
app.delete("/posts/:id", [CheckIfLoggedIn], deletePost);

app.post("/users", [checkIfBodyExist, hashPassword], postUser);

app.listen(3000, () => {
  console.log("Server is listening to port 3000");
});
