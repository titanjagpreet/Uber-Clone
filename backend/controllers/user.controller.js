const userModel = require('../models/user.model');
const blacklistTokenModel = require('../models/blacklistToken.model');
const userService = require('../services/user.services');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {

    const { fullname, lastname, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Email already in use',
      });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();

    const { password: _, ...safeUser } = user.toObject();

    res.status(201).json({
      success: true,
      data: {
        token,
        user: safeUser,
      },
      message: "User registered successfully!"
    });

  } catch (err) {

    res.status(500).json({
      error: err,
      message: "Something went wrong during registration!"
    })
  }
};

module.exports.loginUser = async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials. User not found.',
      });
    }

    const matchPassword = await user.comparePassword(password); 
    if (!matchPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials. Password does not match.',
      });
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    const { password: _, ...safeUser } = user.toObject();

    res.status(200).json({
      success: true,
      data: {
        token,
        user: safeUser,
      },
      message: "User logged in successfully!"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong during login!",
    });
  }

};

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie('token');

  const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

  await blacklistTokenModel.create({ token });

  res.status(200).json({
    message: "Logged out!"
  });
}