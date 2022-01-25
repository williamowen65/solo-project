const userModel = require('../models/userModel')

const usersMW = {}

usersMW.login = async (req, res, next) => {
    next()
}

usersMW.logout = (req, res, next) => {

}

usersMW.signup = async (req, res, next) => {
    try {
        const user = await new userModel(req.body)
        res.locals.user = await user.save()
        next()
    } catch (error) {
        
        next()
    }
}

usersMW.updateAccount = (req, res, next) => {

}

module.exports = usersMW