import response from '../response'
import validation from '../validation'
import GameEngine from '../../gameengine'
import constant from '../../lib/constant'
import debug from '../../lib/debug'

export function enroll (req, res, next) {

}

export function newGame (req, res, next) {
  let config = req.body.gameConfig || {}
  GameEngine.newGame(config)
    .then((result) => {
      res.json(response.ResponseSuccessJSON({
        gameId: result.gameId,
        gameConfig: result.gameConfig
      }))
    })
    .catch((err) => { debug.error(err) })
}

export function getGameList (req, res, next) {
  res.json(response.ResponseJSON({
    gameList: GameEngine.getGameList()
  }))
}

export function getOnlineStatus (req, res, next) {
  
}

export default {
  'enroll': enroll,
  'new_game': newGame,
  'get_game_list': getGameList,
  'get_online_status': getOnlineStatus
}
