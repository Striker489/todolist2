const express = require('express');
const router = express.Router();
const Calendar = require('../models/calendarModel');

router.post('/calendars', async (req, res) => {
  try {
    const newCalendar = new Calendar(req.body);
    const savedCalendar = await newCalendar.save();
    res.status(201).json(savedCalendar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/calendars', async (req, res) => {
  try {
    const calendars = await Calendar.find();
    res.status(200).json(calendars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/calendars/:calendarId', async (req, res) => {
  try {
    const calendar = await Calendar.findById(req.params.calendarId);
    if (!calendar) {
      return res.status(404).json({ message: 'Calendar not found' });
    }
    res.status(200).json(calendar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/calendars/:calendarId', async (req, res) => {
  try {
    const updatedCalendar = await Calendar.findByIdAndUpdate(req.params.calendarId, req.body, { new: true });
    if (!updatedCalendar) {
      return res.status(404).json({ message: 'Calendar not found' });
    }
    res.status(200).json(updatedCalendar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/calendars/:calendarId', async (req, res) => {
  try {
    const deletedCalendar = await Calendar.findByIdAndDelete(req.params.calendarId);
    if (!deletedCalendar) {
      return res.status(404).json({ message: 'Calendar not found' });
    }
    res.status(200).json({ message: 'Calendar deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
