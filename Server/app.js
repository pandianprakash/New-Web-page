const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const postRouter = require('./routes/postRoutes');  // Import your postRouter
const userRouter = require('./routes/userRouters');  // Import your userRouter (if needed)
const indexRouter = require('./routes/index'); // Import your indexRouter (if needed)

const app = express();

// MongoDB Atlas Connection
mongoose.connect('mongodb+srv://your-connection-string', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB Atlas');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup (for any views you want to render in the future)
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', indexRouter); // Add index route
app.use('/users', userRouter); // Add user route
app.use('/api/posts', postRouter); // Add post route for API

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Export app for use in other files (e.g., for server startup)
module.exports = app;
