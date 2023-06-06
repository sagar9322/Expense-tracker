const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(express.json());
app.use(cors());
// Middleware
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const sequelize = require('./config/database');

// Routes
const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

// Start the server
sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(4000);
  })
  .catch(err => {
    console.log(err);
  });