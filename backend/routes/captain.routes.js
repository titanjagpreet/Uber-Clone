const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');
const { authCaptain } = require('../middlewares/auth.middleware')

router.post('/register', [

    body('fullname.firstname').isLength({ min: 2 }).withMessage('First name must be at leat 2 chars long'),

    body('fullname.lastname').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),

    body('email').isEmail().withMessage('Invalid email'),

    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars long'),

    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 chars long'),

    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 chars long'),

    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),

    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
],
    captainController.registerCaptain
);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),

    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars long')
],
    captainController.loginCaptain
)

router.get('/profile', authCaptain, captainController.getCaptainProfile);

router.get('/logout', authCaptain, captainController.logoutCaptain);

module.exports = router;