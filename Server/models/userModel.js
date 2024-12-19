// models/userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  status: { type: String, default: 'active' },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
