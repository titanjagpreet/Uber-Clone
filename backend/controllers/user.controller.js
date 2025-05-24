const userModel = require('../models/user.model');
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

    const { firstname, lastname, email, password } = req.body;
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
      firstname,
      lastname,
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
    });

  } catch (err) {

    next(err);
  }
};
