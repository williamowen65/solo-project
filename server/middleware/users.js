const userModel = require('../models/userModel')
const sessionModel = require('../models/sessionModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { 
    generateAccessToken,
    generateRefreshToken,
 } = require('../util/helper-functions')

const usersMW = {}

usersMW.login = async (req, res, next) => {
    try {
        const user = await userModel.findOne({email: req.body.email})
        const auth = await bcrypt.compare(req.body.password, user.password)
        if(auth) {
            res.locals.user = user
            next()
        } else {
            next('Not authenticated')
        }
    } catch (error) {
        next(error)
    }
}

usersMW.logout = (req, res, next) => {

}

usersMW.cred = (req, res, next) => {
    const user = res.locals.newUser || res.locals.user
    if(user){
        res.locals.cred = {
            accessToken: generateAccessToken(user.username),
            refreshToken: generateRefreshToken(user.username),
        }
        console.log(res.locals.cred);
        next()
    } else {
        next('cred/user auth error')
    }
}

usersMW.signup = async (req, res, next) => {
    try {
        const user = await new userModel(req.body)
        const newUser = await user.save()

        res.locals.newUser = newUser
    
        next()
    } catch (error) {
        next(error)
    }
}

usersMW.createSession = async (req, res, next) => {
    try {
        const session = new sessionModel({ jwt: res.locals.cred.refreshToken })
        const mySession = await session.save()
        if(mySession){
            next()
        } else {
            next('error creating session')
        }
    } catch (error) {
        next(error)
    }
}

usersMW.updateAccount = (req, res, next) => {

}

module.exports = usersMW