const gameModel = require('../models/gameModel.js')
const userModel = require('../models/userModel.js')
const jwt = require('jsonwebtoken')

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

gameMW.findAllPublic = async (req, res, next) => {
    try {
        const games = await gameModel.find({'metadata.status': 'public'}, {title: 1, description: 1, 'setup.players.numAllowed': 1})
        res.locals.publicGames = games
        next()
    } catch (error) {
        next(error)
    }
}

gameMW.getUserGames = async (req, res, next) => {
    
    const token = req.header('Authorization').split(' ')[1]
    const decodedToken = jwt.decode(token)
    const id = decodedToken._id
    
    try {
        // get game ids
        const gamesDoc = await userModel.findById(id, {userGames: 1, _id: 0})
        const ids = gamesDoc.userGames
        // console.log(ids);
    
        const games = await gameModel.find({_id: {$in: ids }})
        // console.log(games);
        res.locals.userGames = games
        next()
    } catch (error) {
        next(error)
    }
}

gameMW.update = async (req, res, next) => {
    const type = Object.keys(req.body.payload)[0]
    let update;
    switch (type) {
        case 'status':
            update = {'metadata.status': req.body.payload[type]}
            break;
    
        default:
            break;
    }

    try {
        const game = await gameModel.findByIdAndUpdate(req.body.id, update, {new: true})
        // console.log(game);
        next()
    } catch (error) {
        next(error)
    }
}




module.exports = gameMW