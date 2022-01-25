const mongoose = require('mongoose');
require('dotenv').config()
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
    // console.log(err.message, err.code);
    let error = { email: '', password: '' }

    //incorrect email
    if(err.message.includes('auth failed')){
        error.password = 'Username/Password auth error'
    }

    // /// duplicate error code
    else if(err.code === 11000) {
        error.email = 'That email is already registered'
        return error
    }
    //validation errors
    else if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            error[properties.path] = properties.message
        })
    } else {
        error = { error: err}
    }
    return error
}




const dbURI = process.env.LOCAL_CONNECTION;

console.log('DBURI: ', dbURI);

async function dbConnect() {
    return mongoose.connect(dbURI, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
}



function generateAccessToken(user) {
    return jwt.sign({username: user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h'})
}
function generateRefreshToken(user) {
    return jwt.sign({username: user}, process.env.REFRESH_TOKEN_SECRET)
}


module.exports = {
    handleErrors,
    dbConnect,
    generateAccessToken,
    generateRefreshToken
}