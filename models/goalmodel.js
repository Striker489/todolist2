const express = require('express');
const router = express.Router();
const Goal = require('../models/goalmodel');

router.post('/', async (req, res) => {
  try {
    const { objective, done, owner, due } = req.body;
    const goal = new Goal({ objective, done, owner, due });
    const newGoal = await goal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find();
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (goal) {
      res.status(200).json(goal);
    } else {
      res.status(404).json({ message: 'Goal not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { objective, done, owner, due } = req.body;
    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      { objective, done, owner, due },
      { new: true }
    );
    if (updatedGoal) {
      res.status(200).json(updatedGoal);
    } else {
      res.status(404).json({ message: 'Goal not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
    if (deletedGoal) {
      res.status(200).json({ message: 'Goal deleted successfully' });
    } else {
      res.status(404).json({ message: 'Goal not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
