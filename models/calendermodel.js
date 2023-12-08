const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    }],
    goals: [{
        type: mongoose.schema.Types.ObjectId,
        ref:'Goal',
    }],
});

const Calendar = mongoose.model('Calendar', calendarSchema);
module.exports = Calendar;
