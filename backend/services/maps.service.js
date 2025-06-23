const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    const accessToken = process.env.MAPBOX_API_KEY;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${accessToken}&limit=1`;
    
    try {
        const response = await axios.get(url);
        
        if (response.data.features && response.data.features.length > 0) {
            const coordinates = response.data.features[0].geometry.coordinates;
            return {
                ltd: coordinates[1],
                lng: coordinates[0]
            };

        } else {

            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {

        console.error(error);
        throw error;
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }
    
    const accessToken = process.env.MAPBOX_API_KEY;
    
    try {
        // First, geocode the origin and destination to get coordinates
        const originCoords = await module.exports.getAddressCoordinate(origin);
        const destCoords = await module.exports.getAddressCoordinate(destination);
        
        // Use Mapbox Directions API for distance and duration
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${originCoords.lng},${originCoords.ltd};${destCoords.lng},${destCoords.ltd}?access_token=${accessToken}`;
        
        const response = await axios.get(url);
        
        if (response.data.routes && response.data.routes.length > 0) {
            const route = response.data.routes[0];
            
            return {
                distance: {
                    text: `${(route.distance / 1000).toFixed(1)} km`,
                    value: Math.round(route.distance) // distance in meters
                },
                duration: {
                    text: `${Math.round(route.duration / 60)} mins`,
                    value: Math.round(route.duration) // duration in seconds
                },
                status: 'OK'
            };
        } else {
            throw new Error('No routes found');
        }

    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }
    
    const accessToken = process.env.MAPBOX_API_KEY;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(input)}.json?access_token=${accessToken}&autocomplete=true&limit=5`;
    
    try {
        const response = await axios.get(url);
        if (response.data.features && response.data.features.length > 0) {
            return response.data.features
                .map(feature => feature.place_name)
                .filter(value => value);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}
