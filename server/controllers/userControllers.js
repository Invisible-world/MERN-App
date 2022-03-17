const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).send("Please add all fields");
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  console.log(userExists);
  if (userExists) {
    res.status(500).send("User already exists");
    throw new Error("Invalid user data");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).send("Invalid user data");
    throw new Error("Invalid user data");
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Please add all required fields");
  }

  // Check for user email
  const user = await User.findOne({ email });
  //Debugging bycrpt compare method requires args of type string
  const stringPassword = password.toString();

  if (user && (await bcrypt.compare(stringPassword, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).send("Invalid credentials");
    // debugger;
    throw new Error("Invalid credentials");
  }
};

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getUser = async (req, res) => {
  // const { _id, name, email } = await User.findById(req.user.id);

  // res.status(200).json({
  //   id: _id,
  //   name,
  //   email,
  // });

  res.json(req.user);
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
