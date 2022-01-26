const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
For some reason unique title wasn't working.
The mongodb has this index manually inserted 
db.games.createIndex({title: 1}, {unique: true})
*/

const gameSchema = new Schema({
    title: {
        type: String,
        required: [true, "Game title is required"],
        minlength: [4, "Game title must be at least 4 characters long"],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        default: 'no description'
    },
    rules: {
        type: Object,
        default: {}
    },
    requires: {
        type: Object,
        default: {}
    },
    metadata: {
        rating: {
            type: Number,
            default: null
        }
    }
})

module.exports = mongoose.model('game', gameSchema)