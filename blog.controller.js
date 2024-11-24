const Database = require("better-sqlite3");
const db = new Database("databas.db");

function getAllPosts(req, res) {
  const getAllPostsQuery = `SELECT * FROM posts`;
  const stmt = db.prepare(getAllPostsQuery);
  const posts = stmt.all();
  return res.json(posts);
}

function deletePost(req, res) {
  const { id } = req.params;

  const getPostByIdQuery = `
    SELECT * FROM posts 
    WHERE post_id = ?
`;

  let stmt = db.prepare(getPostByIdQuery);
  const post = stmt.get([id]);

  if (!post) {
    return res
      .status(404)
      .json({ message: "The post with that id was not found" });
  }

  const deletePostById = `
  DELETE FROM posts
  WHERE post_id = ?
  `;

  stmt = db.prepare(deletePostById);
  stmt.run([id]);
  
  return res.json({message: "The post was deleted successfully"});
}

function getPostById(req, res) {
  //   const params = req.params;
  //   const id = params.id;
  const { id } = req.params;

  const getPostByIdQuery = `
    SELECT * FROM posts 
    WHERE post_id = ?
`;

  const stmt = db.prepare(getPostByIdQuery);
  const post = stmt.get([id]);

  if (post) {
    return res.json(post);
  }

  return res
    .status(404) // Means NOT FOUND
    .json({ message: "The post with that id was not found" });
}

function postPost(req, res) {
  const body = req.body;
  const lengthOfBody = Object.keys(body).length;

  if (!lengthOfBody) {
    return res
      .status(400)
      .json({ message: "Body is malformed or doesn't exist." });
  }

  const insertQuery = `
    INSERT INTO posts (content)
    VALUES (?)
  `;

  const stmt = db.prepare(insertQuery);
  stmt.run([body.content]);

  return res
    .status(201)
    .json({ message: "The new post was successfully created" });
}

function putPost(req, res) {
  const { id } = req.params;
  const { body } = req; // object destructuring

  if (!body.content) {
    return res
      .status(400)
      .json({ message: "body.content is malformed or doesn't exist." });
  }

  const getPostByIdQuery = `
    SELECT * FROM posts 
    WHERE post_id = ?
`;

  let stmt = db.prepare(getPostByIdQuery);
  const post = stmt.get([id]);

  if (!post) {
    return res
      .status(404)
      .json({ message: "The post with that id was not found" });
  }

  const putPostQuery = `
    UPDATE posts
    SET content = ?
    WHERE post_id = ?
  `;

  stmt = db.prepare(putPostQuery);
  stmt.run([body.content, id]);

  return res.json({ message: "The post was successfully updated" });
}

module.exports = {
  getAllPosts,
  getPostById,
  postPost,
  putPost,
  deletePost,
};
