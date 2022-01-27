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
        round: {
            type: Array,
            required: true,
            default: []
        }
    },
    setup: {
        table: {
            deck: {
                numDecks: {
                    type: Number,
                    required: true,
                    default: 1
                },
                placement: {
                    type: Array,
                    required: true,
                    default: []
                }
            }
        },
        players: {
            numAllowed: {
                type: Number,
                required: true,
                default: 4
            },
            hand: {
                numStart: {
                    type: Number,
                    required: true,
                    default: 5
                }
            }
        }
    },
    metadata: {
        rating: {
            type: Number,
            default: null
        },
        status: {
            type: String,
            default: 'private',
            required: true
        }
    }
})

module.exports = mongoose.model('game', gameSchema)