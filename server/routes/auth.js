const express = require('express');
const usersMW = require('../middleware/users')

const router = express.Router();

router.post('/signup', usersMW.signup, usersMW.cred, usersMW.createSession, (req, res) => {
    res.status(201).json(res.locals.cred)
})

router.post('/login', usersMW.login, usersMW.cred, usersMW.createSession, (req, res) => {
    res.status(202).json(res.locals.cred)
})


router.patch('/', (req, res) => {
    res.send(`update user info`)
})

module.exports = router