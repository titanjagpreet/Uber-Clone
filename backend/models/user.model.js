const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            trim: true,
            minlength: [2, 'First name must be at least 3 characters']
        },
        lastname: {
            type: String,
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
        minlength: [5, 'Email must be at least 5 chars long ']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be of at least 6 characters"],
        select: false
    },

    socketId: {
        type: String,
    }
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h'});
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('User', userSchema)

module.exports = userModel;