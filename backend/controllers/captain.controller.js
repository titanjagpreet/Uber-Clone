const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.services');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }

    try {

        const { fullname, email, password, vehicle } = req.body;

        const existingCaptain = await captainModel.findOne({ email });

        if (existingCaptain) {
            return res.status(400).json({
                success: false,
                error: 'Email already in use',
            });
        }

        const hashedPassword = await captainModel.hashPassword(password);

        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });

        const token = captain.generateAuthToken();

        const { password: _, ...safeCaptain } = captain.toObject();

        res.status(201).json({
            success: true,
            data: {
                token,
                captain: safeCaptain,
            },
            message: "Captain registered successfully!"
        });

    } catch (err) {

        res.status(500).json({
            error: err,
            message: "Something went wrong during registration!"
        });

    }

}

module.exports.loginCaptain = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }

    try {
        const { email, password } = req.body;

        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials. Captain not found.',
            });
        }

        const matchPassword = await captain.comparePassword(password);

        if (!matchPassword) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials. Password does not match.',
            });
        }

        const token = captain.generateAuthToken();

        res.cookie('token', token);

        const { password: _, ...safeCaptain } = captain.toObject();

        res.status(200).json({
            success: true,
            data: {
                token,
                captain: safeCaptain,
            },
            message: "Captain logged in successfully!"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong during login!",
        });
    }

};