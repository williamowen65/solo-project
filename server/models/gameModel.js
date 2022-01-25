const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    title: {
        type: String,
        required: [true, "Game title is required"],
        minlength: [4, "Game title must be at least 4 characters long"]
    },
    setup: {
        type: String,
        default: 'This will be an object with a few properties'
    },
    rating: {
        type: Mixed,
        default: null
    }
})

module.exports = mongoose.model('game', gameSchema)