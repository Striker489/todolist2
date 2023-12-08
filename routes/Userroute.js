
const asyncHandler = require('express-async-handler');
const express = require('express');
const userroute = express.Router();
const generateToken = require("../middleware/tokengen.js");
const auth=require("../middleware/auth.js")
const User =require("../models/usermodel.js")

userroute.post(
  "/login",
  asyncHandler(async (req, res) => {
    const emailf = req.body.email.toLowerCase();
    const password = req.body.password;
    const user = await User.findOne({ email: emailf });

    if (user && password == user.password) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
          info: user.info,
          friend: user.friends,
        picture:user.picture,
        token: generateToken(user._id, user.username),
      });
    } else {
      res.status(401).json({ msg: "Invalid Email or Password !" });
    }
  })
);


userroute.post(
  '/signup',
  asyncHandler(async (req, res) => {
    const { username, email, password, info, friends, picture } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() }).maxTimeMS(15000);;
    if (existingUser) {
      res.status(400).json({ msg: 'Email already exists' });
    } else {
      const newUser = new User({
        username,
        email: email.toLowerCase(), 
        password, 
        info,
        friends,
        picture,
      });

      
      const savedUser = await newUser.save();

      res.status(201).json({
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        info: savedUser.info,
        friend: savedUser.friends,
        picture: savedUser.picture,
        token: generateToken(savedUser._id, savedUser.username),
      });
    }
  })
);
 userroute.get( "/profile",
  auth,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
         _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        info: savedUser.info,
        friend: savedUser.friends,
        picture: savedUser.picture,
      });
    } else {
      res.status(404);
      throw new Error("User Not Found !");
    }
  })
); 
userroute.put(
  '/users/:userId',
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const { username, email, password, info, friends, picture } = req.body;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      user.username = username || user.username;
      user.email = email ? email.toLowerCase() : user.email; // Ensure email is saved in lowercase
      user.password = password || user.password;
      user.info = info || user.info;
      user.friends = friends || user.friends;
      user.picture = picture || user.picture;

   
      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        info: updatedUser.info,
        friend: updatedUser.friends,
        picture: updatedUser.picture,
        
      });
    } catch (error) {
      res.status(500).json({ msg: 'Internal server error' });
    }
  })
);
userroute.delete(
  '/users/:userId',
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

     
      await user.remove();

      res.status(200).json({ msg: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ msg: 'Internal server error' });
    }
  })
);



module.exports = userroute;
