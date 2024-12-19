const User = require("../models/userModel");

// Create new user
const addUser = async (req, res) => {
  try {
    const { name, email, status } = req.body;
    const newUser = new User({ name, email, status: status || 'active' });
    await newUser.save();
    res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fetch all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Toggle user status (active/inactive)
const toggleUserStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.status = user.status === 'active' ? 'inactive' : 'active';
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addUser, getUsers, toggleUserStatus };
