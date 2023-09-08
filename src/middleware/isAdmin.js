const jwt = require("jsonwebtoken");
const config = require("../config/index");

module.exports = function auth(req, res, next) {
  let token = req.header("Authorization");

  // Verify and decode the token
  try {
    const decoded = jwt.verify(token, config.SECRET_CODE);

    // Access the role from the decoded token
    const userRole = decoded.role;

    if (userRole === "admin") {
      next();
    } else {
      res.status(400).json({
        msg: "You can't create new user",
      });
    }
  } catch (error) {
    return res.status(400).send("Yaroqsiz token");
  }
};
