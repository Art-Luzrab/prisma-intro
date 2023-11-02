const express = require('express')
const app = express();

const PORT =  7567;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//Api Routes
app.use('/api', require('./api'))



// Simple error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status ?? 500;
  const message = err.message ?? 'Internal server error.';
  res.status(status).json({ message });
});










app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });