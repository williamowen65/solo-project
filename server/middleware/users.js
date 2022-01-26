const userModel = require('../models/userModel')
const sessionModel = require('../models/sessionModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { 
    generateAccessToken,
    generateRefreshToken,
 } = require('../util/helper-functions')
const { use } = require('../routes/auth')

const usersMW = {}

usersMW.login = async (req, res, next) => {
    try {
        if(req.body.email.trim().length === 0) {
            next({code: 2})
        }
        const user = await userModel.findOne({email: req.body.email})
        if(user){
            const auth = await bcrypt.compare(req.body.password, user.password)
            if(auth) {
                res.locals.user = user
                next()
            } else {
                next({code: 3})
            }
        } else {
            next({code: 1})
        }
    } catch (error) {
        next(error)
    }
}

usersMW.logout = async (req, res, next) => {
    try {
        console.log('logout', req.body);
        await sessionModel.deleteOne({jwt: req.body.jwt})
        next()
    } catch (error) {
        next(error)
    }
}

usersMW.cred = (req, res, next) => {
    const user = res.locals.newUser || res.locals.user
    console.log('user: ', user);
    if(user){
        res.locals.cred = {
            accessToken: generateAccessToken(user.username),
            refreshToken: generateRefreshToken(user.username),
        }
        // console.log('cred: ', res.locals.cred);
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
        console.log('from createSess:', res.locals.cred);
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

usersMW.updateAccount = async (req, res, next) => {
    try {
        await userModel.findOneAndUpdate({email: req.body.email}, {$set: {username: req.body.username}})
        next()
    } catch (error) {
        next(error)
    }
}

usersMW.authorize = async (req, res, next) => {
    const bearer = req.header('Authorization-Access')
    const accessToken = bearer.split(' ')[1]

    try {
        if(await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)){

            const user = jwt.decode(accessToken, process.env.ACCESS_TOKEN_SECRET)
            console.log(user);
            res.json({
                auth: true,
                username: user.username
            })
        }
        
    } catch (err) {
        console.log('err block');
        const bearer2 = req.header('Authorization-Refresh')
        const refreshToken = bearer2.split(' ')[1]
        try {
            const session = await sessionModel.findOne({jwt: refreshToken})
            const user = jwt.decode(refreshToken, process.env.REFRESH_TOKEN_SECRET)
            console.log('session:', session);
            if(session) {
                await sessionModel.deleteOne({jwt: refreshToken})
                res.locals.user = {username: user.username}
                // console.log('user:', user.username, res.locals);
            }
            
            next()
        } catch (error) {
            next('some error in authorize')
        }
    }
}


module.exports = usersMW