const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(`
        Welcome to Round Table API

        For help - GET /help
    `)
})


router.get('/help', (req, res) => {
    res.send(`
    Here is info about using this api
    
    GET '/games' - list of all games
    `)
})

module.exports = router