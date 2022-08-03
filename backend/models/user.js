const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    max: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    max: 1024,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  regDate: {
    type: Date,
    default: Date.now(),
  },
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey"),
    { expiresIn: "1h" }
  );
  return token;
};
const User = mongoose.model("User", userSchema);

exports.User = User;
