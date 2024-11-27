const { createHmac } = require("crypto");

function logRequest(req, res, next) {
  const logString = `[${new Date().toISOString()}] ${req.method} ${req.url}`;
  console.log(logString);
  next();
}

function hashPassword(req, res, next) {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "The password is missing." });
  }

  const secret = "starwarsattackoftheclones";

  const hashedPassword = createHmac("sha256", secret)
    .update(password)
    .digest("hex");

  req.hashedPassword = hashedPassword;

  delete req.password;

  next();
}

function checkIfBodyExist(req, res, next) {
  const body = req.body;
  const lengthOfBody = Object.keys(body).length;

  if (!lengthOfBody) {
    return res
      .status(400)
      .json({ message: "Body is malformed or doesn't exist." });
  }

  next();
}

function CheckIfLoggedIn(req, res, next) {
  return res.status(401).json({ message: "You are not logged in" });
  // Could more specific logic to check if the user is logged in or not
}

module.exports = {
  logRequest,
  hashPassword,
  checkIfBodyExist,
  CheckIfLoggedIn,
};
