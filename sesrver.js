const cors = require('cors');
const userroute = require('./routes/Userroute');
const taskRoutes = require('./routes/Taskroute');

const express = require('express');
const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017/';
const dbName = 'TaskManager';
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let dbClient; // Store the database client globally

const connectToDatabase = async () => {
  try {
    dbClient = await MongoClient.connect(url, { useNewUrlParser: true });
    console.log('Connected to database');
  } catch (err) {
    console.error('MongoDB connection error', err);
  }
};

connectToDatabase();

app.use((req, res, next) => {
  req.db = dbClient.db(dbName);
  next();
});

app.use('/users', userroute);
app.use('/tasks', taskRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
