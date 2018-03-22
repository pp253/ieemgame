import Game from './components/game'
import Enroll from './components/enroll'
import Regist from './components/regist'

export class GameEngine {
  constructor() {
    this.gameList = []

    this.enroll = new Enroll()
    this.regist = new Regist()
  }

  getRegist() {
    return this.regist
  }

  getEnroll() {
    return this.enroll
  }

  // config {Object}
  newGame(config) {
    return new Promise((resolve, reject) => {
      new Game(config)
        .then(res => {
          this.gameList.push(res.this)

          resolve({
            gameId: res.gameId,
            gameConfig: res.gameConfig
          })
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  getGameList() {
    let list = []
    for (let game of this.gameList) {
      list.push({
        gameId: game.getGameId(),
        gameConfig: game.getConfig()
      })
    }
    return list
  }

  getOnlineStatus(gameId) {
    return this.getEnroll().getEnrolledUsers(gameId)
  }

  gameIsExist(gameId) {
    for (let game of this.gameList) {
      if (game.getGameId().equals(gameId)) {
        return true
      }
    }
    return false
  }

  selectGame(gameId) {
    for (let game of this.gameList) {
      if (game.getGameId().equals(gameId)) {
        return game
      }
    }
    return false
  }
}

export default new GameEngine()
