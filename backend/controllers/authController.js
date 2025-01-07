const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30d',
  });
};

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ email, password });

    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logoutUser = (req, res) => {
  // Perform any necessary cleanup here, such as logging the logout event
  console.log(`User ${req.user.email} logged out`);
  res.status(200).json({ message: 'Logged out successfully' });
};