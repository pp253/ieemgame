import constant from '../lib/constant'
import debug from '../lib/debug'
import Game from './components/game'

export class GameEngine {
  constructor () {
    this.gameList = []
  }

  enroll () {

  }

  // config {Object}
  newGame (config) {
    return new Promise((function (resolve, reject) {
      (new Game(config))
        .then((function (res) {
          this.gameList.push(res.this)
          resolve({
            gameId: res.gameId,
            gameConfig: res.gameConfig
          })
        }).bind(this))
        .catch((err) => { reject(err) })
    }).bind(this))
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
