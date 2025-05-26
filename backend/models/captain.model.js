const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const captainSchema = new Schema({

    fullname: {
        firstname: {
            type: String,
            required: true,
            trim: true,
            minlength: [2, 'First name must be at least 3 characters']
        },
        lastname: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, 'Last name must be at least 3 characters']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: [5, 'Email must be at least 5 chars long '],
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be of at least 6 characters"],
        select: false
    },

    socketId: {
        type: String,
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: ['inactive']
    },

    vehicle: {
        color: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, 'Color must be at least 3 chars long']
        },

        plate: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, 'Plate must be at least 3 chars long']
        },

        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1']
        },

        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto'],
        }
    },

    location: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    }
});

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h'});
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel;