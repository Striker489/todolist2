const express = require('express');
const router = express.Router();
const Notification = require('../models/notificationmodel');


router.post('/', async (req, res) => {
  try {
    const { message, recipient } = req.body;
    const notification = new Notification({ message, recipient });
    const newNotification = await notification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (notification) {
      res.status(200).json(notification);
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { message, recipient } = req.body;
    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      { message, recipient },
      { new: true }
    );
    if (updatedNotification) {
      res.status(200).json(updatedNotification);
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedNotification = await Notification.findByIdAndDelete(req.params.id);
    if (deletedNotification) {
      res.status(200).json({ message: 'Notification deleted successfully' });
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
