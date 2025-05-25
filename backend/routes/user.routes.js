const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const { authUser } = require('../middlewares/auth.middleware')

router.post('/register', [
    body('fullname.firstname').isLength({ min: 2 }).withMessage('First name must be at leat 2 chars long'),

    body('fullname.lastname').optional().isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),

    body('email').isEmail().withMessage('Invalid email'),

    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars long')
],
    userController.registerUser
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),

    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars long')
],
    userController.loginUser
)

router.get('/profile', authUser, userController.getUserProfile);

router.get('/logout', authUser, userController.logoutUser);

module.exports = router;