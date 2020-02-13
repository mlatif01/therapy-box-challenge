const router = require('express').Router();
const bcrypt = require('bcrypt');

// Models
const Users = require('../models/Users');
const {registerValidation} = require('../models/Users');

/**
 * GET
 * Test Method
 */
router.get('/', (req, res) => {
  res.send("Test Api");
});

/**
 * POST
 * Register Users
 */
router.post('/register', async (req, res) => {
  
  // Validate data before we create user
  const {error} = registerValidation(req.body);
  if (error) return res.status(400).json({
    status: 'error',
    type: error.details[0].path,
    message: error.details[0].message
  });

  // Check if email is already in DB
  const emailExists = await Users.findOne({ email: req.body.email });
  if (emailExists) {
    console.log('Email already in Database');
    return res.status(400).json({
      status: 'error',
      type: "email",
      message: "Email has already been registered"
    });
  }

  // Checking if the username is already in the database
  const userExists = await Users.findOne({ username: req.body.username });
  if (userExists) {
    return res.status(400).json({
      status: 'error',
      type: "username",
      message: "Username has already been registered"
    });
  }

  // Generate salt and hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user object
  const newUser = new Users({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  });

  // Save user in DB
  try {
    const savedUser = await newUser.save();
    res.json({ savedUser });
  } catch (err) {
    console.log(err);
  }
})

// Export
module.exports = router;