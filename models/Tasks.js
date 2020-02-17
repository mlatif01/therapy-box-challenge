const mongoose = require('mongoose');
const Joi = require('joi');

const TasksSchema = new mongoose.Schema({
    tasks: {
      type: mongoose.Schema.Types.Array,
      ref: 'Tasks',
      required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Tasks', TasksSchema);
