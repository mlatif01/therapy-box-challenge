const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;
const {DB_CONNECT} = require('./config/keys');

const users = require('./routes/users');

// Connect to DB
mongoose.connect(DB_CONNECT, {useNewUrlParser: true}, () => {
  console.log('Connected to DB successfully');
}).catch(err => console.log(error(`Connectiion to DB not established due to error: ${err}`)));

// Allow cors
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', users);

// Listen on specified port
app.listen(port, () => console.log(`Listening on ${port}`));