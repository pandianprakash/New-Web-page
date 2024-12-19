// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Dummy user for testing (usually fetched from a database)
const users = [
  { id: 1, email: 'user@example.com', password: '$2a$10$kT61PwnmnUs8x5Ls98kFWu26u7snL4yDWlXJqzM0cOYm3HpH8jiOa' }, // password: test123
];

// JWT Secret Key (store in .env for security in a real app)
const JWT_SECRET = 'mysecretkey';

// Route to handle login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = users.find((u) => u.email === email);
  
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Compare password with the hashed password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

  // Send token as response
  res.json({ token });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
