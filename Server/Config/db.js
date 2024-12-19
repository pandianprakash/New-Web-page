mongoose.connect('mongodb+srv://pandianprakash317:muthupandi001@cluster0.tzu335l.mongodb.net/admin_dashboard')
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
