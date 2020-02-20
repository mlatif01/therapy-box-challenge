const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const port = process.env.PORT || 5000;
const {DB_CONNECT} = require('./config/keys');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const fs = require('file-system');

// Auth
const auth = require('./config/auth')

// Image Model
const Image = require('./models/Image');

// Init app
const app = express();

// Set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + 
    path.extname(file.originalname));
  }
});

// Initialise upload
const upload = multer({
  storage: storage
})
//   limits: {filesize: 1000000},
//   fileFilter: function(req, file, cb) {
//     checkFileType(file, cb);
//   }
// }).single('imageData');

// Check file type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Route for multer
app.post('/api/upload', auth, upload.single('imageData'), async (req, res, next) => {
  const file = fs.readFileSync(req.file.path);
  const encodeImage = file.toString('base64');

  // define a JSON Object for image
  const newImage = new Image({
    contentType: req.file.mimetype,
    path: req.file.path,
    image: new Buffer(encodeImage, 'base64'),
    userId: req.user._id
  });

  console.log(newImage.image);

  // insert image to DB
  try {
    const savedImage = await newImage.save();
    res.json({ savedImage });
  } catch (err) {
    console.log(err);
  }

  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
});

app.get('/api/upload', auth, async (req, res) => {

  // Checking if the user has tasks entry
  const imageExists = await Image.findOne({userId: req.user._id});

  // retrieve task data
  const entry = imageExists;
  try {
      console.log(entry);
      res.send(entry);
  } catch(err) {
      console.log(err);
      res.status(400).send(err);
  }
});

// Public folder
app.use(express.static('./public'));

// Routers
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

// Routes
app.use('/api/users', users);
app.use('/api/news', news);
app.use('/api/clothes', clothes);
app.use('/api/tasks', tasks);
app.use('/api/photos', photos);

// Listen on specified port
app.listen(port, () => console.log(`Listening on ${port}`));