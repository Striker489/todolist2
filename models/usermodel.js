const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: false,
    default: false,
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  }],
  picture: {
    type: String,  required: false
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

