const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function auth(req, res, next) {

  try {
    const token = req.headers.token.split(' ')[1];
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).json({ message: "Auth failed!" });
  }
};
