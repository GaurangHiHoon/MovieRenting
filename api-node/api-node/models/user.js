const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
var SchemaObject = require("schema-object");

const userSchema = new SchemaObject(
  {
    userId: { type: Number },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
    },
    isAdmin: Boolean
  },
  {
    // Add methods to User prototype
    methods: {}
  }
);

const User = userSchema;

/** User.generateAuthToken = function() {
  const token = jwt.sign(
    {
      id: this.id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin
    },
    config.get("jwtPrivateKey")
  );
  return token;
};
**/

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(50)
      .required(),
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

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
