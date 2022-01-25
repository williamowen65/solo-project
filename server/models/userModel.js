const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    userGames: {
        type: Array,
        default: Object
    }
})

module.exports = mongoose.model('user', userSchema)