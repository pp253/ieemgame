import * as response from '../response'
import GameEngine from '../../../src/gameengine'

export function enroll (req, res, next) {

}

export function newGame (req, res, next) {
  let config = req.body.config ? JSON.parse(req.body.config) : {}
  GameEngine.newGame(config)
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
