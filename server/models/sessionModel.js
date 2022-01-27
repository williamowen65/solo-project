const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const sessionSchema = new Schema({
    jwt: {
        type: String,
        required: [true, 'jwt not provided'],
        unique: true
    },
    createdAt: {
        type: Date,
        expires: 60 * 60 * 24,
        default: Date.now
    }
})



module.exports = mongoose.model('session', sessionSchema)