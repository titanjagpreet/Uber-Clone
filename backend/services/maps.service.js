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