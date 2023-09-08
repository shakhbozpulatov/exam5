const jwt = require("jsonwebtoken");
const config = require("../config/index");

// Auth
module.exports = function auth(req, res, next) {
  let token = req.header("Authorization");

  if (!token)
    return res
      .status(401)
      .send("Token bo'lmaganligi sababli murojaat rad etildi");

  try {
    const decode = jwt.verify(token, config.SECRET_CODE);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(400).send("Yaroqsiz token");
  }
};
