import '../lib/db'
import odm from '../lib/db/odm'
import constant from '../lib/constant'
import Game from './components/game'
import response from '../../routes/src/response'
import debug from '../lib/debug'

export class GameEngine {
  constructor () {
    this.gameList = []
  }

  enroll () {

  }

  // config {Object}
  newGame (config) {
    this.gameList.push(new Game(config))
  }

  getGameList () {
    let list = []
    for (let game of this.gameList) {
      list.push({
        gameId: game.getGameId(),
        gameConfig: game.getConfig()
      })
    }
    return list
  }

  getOnlineStatus () {

  }

  gameIsExist (gameId) {
    for (let game of this.gameList) {
      if (game.getGameId().equals(gameId)) {
        return true
      }
    }
    return false
  }

  selectGame (gameId) {
    for (let game of this.gameList) {
      if (game.getGameId().equals(gameId)) {
        return game
      }
    }
  }
}

export default new GameEngine()
