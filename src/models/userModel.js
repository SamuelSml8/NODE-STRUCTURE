const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: Number,
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("nodeUsers", userSchema);

module.exports = User;
