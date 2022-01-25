const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt')

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
        required: [true, "Email is required"],
        unique: true
    },
    userGames: {
        type: Array,
        default: Object
    }
})

userSchema.pre('save', async function (next) {
    try {
        this.password = await bcrypt.hash(this.password, 10)
    } catch (error) {
        next('pre-save processing failed in userModel')
    }
})

module.exports = mongoose.model('user', userSchema)