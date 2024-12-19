const Post = require("../models/postModel");

// Create a new post
const addPost = async (req, res) => {
  try {
    const { text, image } = req.body;
    const newPost = new Post({ text, image });
    await newPost.save();
    res.status(201).json({ message: 'Post added successfully', post: newPost });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fetch all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addPost, getPosts };
