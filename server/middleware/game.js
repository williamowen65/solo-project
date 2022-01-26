const gameModel = require('../models/gameModel.js')

const gameMW = {}

gameMW.create = async (req, res, next) => {
    try {
        const game = new gameModel(req.body)
        await game.save()
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