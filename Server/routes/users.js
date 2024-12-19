var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  isBlocked: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
