const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const sessionSchema = new Schema({
    jwt: {
        type: String,
        required: [true, 'jwt not provided'],
        unique: true
    }
})



module.exports = mongoose.model('session', sessionSchema)