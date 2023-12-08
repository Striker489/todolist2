const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/TaskManager';

module.exports = router;
