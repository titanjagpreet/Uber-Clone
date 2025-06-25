const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }
    
    const distanceTime = await mapService.getDistanceTime(pickup, destination);
    
    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };
    
    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };
    
    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };
    
    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
    };
    
    return fare;
}

module.exports.getFare = getFare;

function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const validVehicleTypes = ['auto', 'car', 'moto'];
    if (!validVehicleTypes.includes(vehicleType)) {
        throw new Error('Invalid vehicle type');
    }
    
    const fare = await getFare(pickup, destination);
    const distanceTime = await mapService.getDistanceTime(pickup, destination);
    
    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType],
        duration: Math.round(distanceTime.duration.value),
        distance: Math.round(distanceTime.distance.value),
        status: 'pending'
    });
    
    return ride;
}
