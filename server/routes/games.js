const express = require('express');
const gameMW = require('../middleware/game')

const router = express.Router();

router.get('/', gameMW.find, (req, res) => {
    res.json(res.locals.games)
})
router.post('/create', gameMW.create, (req, res) => {
    res.send(`game created`)
})



module.exports = router