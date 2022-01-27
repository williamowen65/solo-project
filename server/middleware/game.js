const gameModel = require('../models/gameModel.js')

const gameMW = {}

gameMW.create = async (req, res, next) => {
    try {
        console.log('ping');
        const game = new gameModel(req.body)
        await game.save()
        res.locals.game = game
        next()
        
    } catch (error) {
        next({code: 4})
    }
}

gameMW.find = async (req, res, next) => {
    try {
        const games = await gameModel.find()
        res.locals.games = games
        next()
    } catch (error) {
        next(error)
    }
}




module.exports = gameMW