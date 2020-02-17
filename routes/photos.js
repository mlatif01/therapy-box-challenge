const router = require('express').Router();
const Photos = require('../models/Photos');

// Auth
const auth = require('../config/auth');

/**
 * POST
 * Photos data
 */
router.post('/', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({mgs: 'No files uploaded'});
    }

    const file = req.files.file;
    
    file.mv(`${__dirname}/../client/public/uploads/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send();
        }
        res.json({fileName: file.name, filePath: `/uploads/${file.name}`});
    })
})

/**
 * GET
 * User Photos Data
 */
router.get('/', auth, async (req, res) => {

  // Checking if the user has tasks entry
  const photosExist = await Photos.findOne({userId: req.user._id});

  // retrieve task data
  const entry = photosExist;
  try {
      res.send(entry);
  } catch(err) {
      console.log(err);
      res.status(400).send(err);
  }
});
  

// Export
module.exports = router;