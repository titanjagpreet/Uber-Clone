const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const blacklistTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400
    }
});

const blacklistTokenModel = mongoose.model('blacklistToken', blacklistTokenSchema);

module.exports = blacklistTokenModel;