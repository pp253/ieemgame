import odm from '../lib/db/odm'
import constant from '../lib/constant'
import debug from '../lib/debug'
import Game from './components/game'
import Regist from './components/regist'

export class GameEngine {
  constructor () {
    this.gameList = []
    this.enrollment = {}
    this.last
    this.regist = new Regist()
  }

  getRegist () {
    return this.regist
  }

  isRegisted (nickname) {
    return new Promise((function (resolve, reject) {
      odm.Regist.findOne({ nickname: nickname }).exec((function (err, regist) {
        if (err) {
          reject(err)
          return
        }
        resolve(regist ? true : false)
      }).bind(this))
    }).bind(this))
  }

  regist (nickname) {
    return new Promise((function (resolve, reject) {
      let registOdm = new odm.Regist({
        nickname: nickname
      })

      registOdm.save((function (err, regist) {
        if (err) {
          reject(err)
          return
        }

        resolve({
          userId: regist._id.toString(),
          nickname: nickname
        })
      }).bind(this))
    }).bind(this))
  }

  enroll (userId, gameId, teamIndex, job) {
    let game = this.selectGame(gameId)
    
    if (!game) {
      return false
    }

    // check teamIndex
    if (teamIndex < 0 || teamIndex > game.getConfig().teamNumber) {
      return false
    }

    this.enrollment[gameId][teamIndex][job].push({
      userId: userId,
      time: Date.now()
    })
    return true
  }

  delist (userId, gameId, teamIndex, job) {
    let i = this.enrollment[gameId][teamIndex][job].indexOf(userId)
    if (i === -1) {
      return false
    }
    this.enrollment[gameId][teamIndex][job].splice(i, 1)
    return true
  }

  // config {Object}
  newGame (config) {
    return new Promise((function (resolve, reject) {
      (new Game(config))
        .then((function (res) {
          this.gameList.push(res.this)

          // setup enrollment object
          this.enrollment[res.gameId] = {}
          for (let ti = 0; ti <= res.gameConfig.teamNumber; ti++) {
            this.enrollment[res.gameId][ti] = {}
            for (let job in (ti === 0 ? constant.STAFF_JOBS : constant.JOBS)) {
              this.enrollment[res.gameId][ti][job] = []
            }
          }

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

  getOnlineStatus (gameId) {
    return this.enrollment[gameId]
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
    return false
  }
}

export default new GameEngine()
