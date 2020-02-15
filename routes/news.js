const router = require('express').Router();

// Auth
const auth = require('../config/auth');

/**
 * GET
 * XML BBC News
 */
router.get('/', auth, (req, res) => {
  
})


// Export
module.exports = router;