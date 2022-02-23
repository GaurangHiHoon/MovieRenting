const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //if (!config.get("requiresAuth")) {
  // console.log("inside if", config.get("requiresAuth"));
  //return next();
  //}
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");
  //console.log("let", config.get("jwtPrivateKey"));

  jwt.verify(token, "my_secret_key", function (err, decoded) {
    if (err) {
      //throw new Error(err);
      res.status(400).send("Invalid token.");
    } else {
      req.user = decoded;
      next();
    }
  });
};
