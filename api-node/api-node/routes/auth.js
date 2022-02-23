const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
users = require("../seed").users;
const jwt = require("jsonwebtoken");

const jwtKey = "my_secret_key";
const jwtExpirySeconds = 300;

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //console.log(users);

  let user = await users.find(obj => obj.email === req.body.email);
  if (!user) return res.status(400).send("!!Invalid email or password.");

  //const salt = await bcrypt.genSalt(10);
  //req.body.password = await bcrypt.hash(req.body.password, salt);
  //console.log(user.password, req.body.password);

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  console.log(validPassword);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = jwt.sign({ user }, jwtKey, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds
  });
  console.log("token:", token);
  let obj = { token: token };

  //const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(obj);
});

function validate(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;
