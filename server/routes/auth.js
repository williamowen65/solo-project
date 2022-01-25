const express = require('express');
const usersMW = require('../middleware/users')

const router = express.Router();

router.post('/', usersMW.signup, (req, res) => {
    res.status(201).json(res.locals.user)
})


router.patch('/', (req, res) => {
    res.send(`update user info`)
})

module.exports = router