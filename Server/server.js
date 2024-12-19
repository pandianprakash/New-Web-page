const cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRouters");

const app = express();
const port = 5000;

// Enable CORS for all origins
app.use(cors());

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb+srv://pandianprakash317:muthupandi001@cluster0.tzu335l.mongodb.net/admin_dashboard', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Routes
app.use('/api/posts', postRoutes); // Post routes
app.use('/api/users', userRoutes); // User routes

// Serve the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
