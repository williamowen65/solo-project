const express = require('express');
const gameMW = require('../middleware/game')

const router = express.Router();

router.get('/', gameMW.findAllPublic, (req, res) => {
    res.json(res.locals.games)
})
router.post('/create', gameMW.create, (req, res) => {
    res.json({game: res.locals.game})
})

router.get('/user',gameMW.getUserGames, gameMW.findAllPublic, (req, res) => {
    res.json({games: {
        userGames: res.locals.userGames,
        publicGames: res.locals.publicGames
    }})
})

router.patch('/update', gameMW.update, (req, res) => {
    res.json({update: 'success'})
})



module.exports = router