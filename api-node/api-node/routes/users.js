const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();
users = require("../seed").users;
const jwt = require("jsonwebtoken");

const jwtKey = "my_secret_key";
const jwtExpirySeconds = 300;

router.get("/me", auth, async (req, res) => {
  //const user = await User.findById(req.user.id).select("-password");
  const user = await users.find(obj => +obj.userId === +req.body.userId);
  res.send(user);
});

router.post("/", async (req, res) => {
  let user = users.find(obj => obj.email === req.body.email);
  if (user) return res.status(400).send("User already registered.");
  //if not present insert in users list
  console.log(req.body.isAdmin);
  if (req.body.isAdmin === undefined) {
    user = new User({
      userId: users.length + 1,
      ...req.body,
      isAdmin: false
    });
  } else {
    user = new User({
      userId: users.length + 1,
      ...req.body
    });
  }
  //console.log(user);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await users.push(user);

  const token = jwt.sign({ user }, jwtKey, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds
  });

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers","x-auth-token")
    .send(_.pick(user, ["userId", "name", "email"]));
});

module.exports = router;
