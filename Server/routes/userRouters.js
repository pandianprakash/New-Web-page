const express = require('express');
const router = express.Router();

// Example route
router.get('/', (req, res) => {
  res.send('List of users');
});

// Add more routes as needed for users (e.g., add user, update user, etc.)
module.exports = router;
