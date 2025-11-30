const User=require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken");
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // ✅ use User (the model), not user
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const saltRounds = Number(process.env.SALT) || 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  // ✅ now safely create a new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      // token generation can go here later
       token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter both email and password");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,

      // TODO: add token later if you want
       token: generateToken(user._id), 
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
const generateToken=(id)=>{
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
    /*var token =  jwt.sign({ id },process.env.JWT_SECRET_KEY,{expiresIn:"30d"});
    return token;*/
}
module.exports = { registerUser,loginUser };


