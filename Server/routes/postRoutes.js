// routes/postRoutes.js
const express = require("express");
const Post = require("../models/postModel");
const router = express.Router();

// POST route to create a new post
router.post('/add', async (req, res) => {
  try {
    const { text, image } = req.body;
    const newPost = new Post({ text, image });
    await newPost.save();
    res.status(201).json({ message: 'Post added successfully', post: newPost });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET route to fetch all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all posts
    res.json(posts); // Return posts in JSON format
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
