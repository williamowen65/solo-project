const express = require('express');
const usersMW = require('../middleware/users')

const router = express.Router();

router.post('/signup', usersMW.signup, usersMW.cred, usersMW.createSession, (req, res) => {
    res.status(201).json({
        username: res.locals.newUser.username,
        cred: res.locals.cred
    })
})

router.post('/login', usersMW.login, usersMW.cred, usersMW.createSession, (req, res) => {

    // res.set('Access-Control-Allow-Origin', req.headers.origin)
    // res.set('Access-Control-Allow-Credentials', 'true')

    // res.cookie('accessToken', res.locals.cred.accessToken, {sameSite: 'lax'})
    // res.cookie('refreshToken', res.locals.cred.refreshToken, {sameSite: 'lax'})
    res.status(202).json({
        user: {
            username: res.locals.user.username,
            email: res.locals.user.email
        },
        cred: res.locals.cred
    })
})


router.patch('/', usersMW.updateAccount, (req, res) => {
    res.json({pinged: `update user info`})
})

router.get('/auth', usersMW.authorize, usersMW.cred, usersMW.createSession, (req, res) => {
    console.log(res.locals);
    res.json({
        username: res.locals.user,
        cred: res.locals.cred
    })
})

router.delete('/logout', usersMW.logout, (req, res) => {
    console.log('hey');
    res.status(200).json({status: 'success'})
})


module.exports = router