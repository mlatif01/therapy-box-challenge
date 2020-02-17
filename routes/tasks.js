const router = require('express').Router();
const axios = require('axios').default;
const Tasks = require('../models/Tasks');

// Auth
const auth = require('../config/auth');

/**
 * POST
 * Task data
 */
router.post('/', auth, async (req, res) => {
  
    // Checking if the user has tasks entry
    const tasksExist = await Tasks.findOne({userId: req.user._id});
  
    // Save task in DB
    if (!tasksExist) {
        // Create a new tasks entry
        const entry = new Tasks({
            userId: req.user._id
        });
        entry.tasks =  req.body.tasks;
        try {
            const savedEntry = await entry.save();
            res.send(savedEntry);
        } catch(err) {
            res.status(400).send(err);
        }
    } 
    else if (tasksExist) {
        // add to existing entry
        const entry = tasksExist;
        entry.tasks = req.body.tasks;
        try {
            const savedEntry = await entry.save();
            res.send(savedEntry);
        } catch(err) {
            console.log(err);
            res.status(400).send(err);
        }
    }
});

/**
 * GET
 * User Task Data
 */
router.get('/', auth, async (req, res) => {

    // Checking if the user has tasks entry
    const tasksExist = await Tasks.findOne({userId: req.user._id});

    // retrieve task data
    const entry = tasksExist;
    try {
        res.send(entry);
    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
  });
  
  router.get('/current', auth, async (req, res) => {
    res.send('Test API');
  });

// Export
module.exports = router;