const express = require('express');

const router = express.Router();

router.post('/user', (req, res) => {
    res.send(`sign up`)
})


router.patch('/user', (req, res) => {
    res.send(`update user info`)
})

module.exports = router