const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;
const {DB_CONNECT} = require('./config/keys');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');

const users = require('./routes/users');
const news = require('./routes/news');
const clothes = require('./routes/clothes');
const tasks = require('./routes/tasks');
const photos = require('./routes/photos');

// Connect to DB
mongoose.connect(DB_CONNECT, {useNewUrlParser: true}, () => {
  console.log('Connected to DB successfully');
}).catch(err => console.log(error(`Connectiion to DB not established due to error: ${err}`)));

// Allow cors
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(fileUpload());

// Routes
app.use('/api/users', users);
app.use('/api/news', news);
app.use('/api/clothes', clothes);
app.use('/api/tasks', tasks);
app.use('/api/photos', photos);

// Listen on specified port
app.listen(port, () => console.log(`Listening on ${port}`));