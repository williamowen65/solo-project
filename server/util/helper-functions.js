const handleErrors = (err) => {
    // console.log(err.message, err.code);
    let error = { email: '', password: '' }

    //incorrect email
    if(err.message.includes('auth failed')){
        error.password = 'Username/Password auth error'
    }

    // /// duplicate error code
    if(err.code === 11000) {
        error.email = 'That email is already registered'
        return error
    }
    //validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            error[properties.path] = properties.message
        })
    }
    return error
}

module.exports = {
    handleErrors
}