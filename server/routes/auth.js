const express = require('express');
const usersMW = require('../middleware/users')

const router = express.Router();

router.post('/signup', usersMW.signup, usersMW.cred, usersMW.createSession, (req, res) => {
    res.status(201).json(res.locals.cred)
})

router.post('/login', usersMW.login, usersMW.cred, usersMW.createSession, (req, res) => {

    res.set('Access-Control-Allow-Origin', req.headers.origin)
    res.set('Access-Control-Allow-Credentials', 'true')

    res.cookie('accessToken', res.locals.cred.accessToken, {sameSite: 'lax'})
    res.cookie('refreshToken', res.locals.cred.refreshToken, {sameSite: 'lax'})
    res.status(202).json({username: res.locals.user.username})
})


router.patch('/', (req, res) => {
    res.send(`update user info`)
})

module.exports = router