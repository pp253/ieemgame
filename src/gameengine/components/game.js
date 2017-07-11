import _ from 'lodash'
import odm from '../../lib/db/odm'
import constant from '../../lib/constant'
import debug from '../../lib/debug'
import Team from './team'

export const DEFAULT_CONFIG = {
  title: 'REDRO',
  describe: '2017 工工營 產銷遊戲',
  teamNumber: 4,
  teammembers: [12, 12, 13, 14],
  days: 3,
  dayLong: 300,
  defaultBalance: 19400,
  cost: {
    storage: {
      [constant.JOBS.FACTORY]: {
        [constant.PRODUCTS.CAR]: 3000,
        [constant.PRODUCTS.WHEEL]: 200,
        [constant.PRODUCTS.BODY]: 200,
        [constant.PRODUCTS.ENGINE]: 200
      },
      [constant.JOBS.WHOLESALER]: {
        [constant.PRODUCTS.CAR]: 3000
      },
      [constant.JOBS.RETAILER]: {
        [constant.PRODUCTS.CAR]: 3000
      },
      patchSize: 10,
      permanent: true
    },
    transport: {
      cost: 200,
      patchSize: 4
    },
    wage: 100
  },
  updateInterval: 1000
}

// To load a exist game,
// you can use `new Game(config = {gameId: XXX})`
//   to get the assigned game
export default class Game {
  constructor (gameConfig) {
    this.gameConfig = Object.assign(_.cloneDeep(DEFAULT_CONFIG), gameConfig)
    this.stage = constant.GAME_STAGE.UNKNOWN
    this.gameId = (gameConfig && gameConfig.gameId) || constant.GAMES.UNKNOWN

    this.day = constant.ZERO_DAYTIME.DAY
    // dayStartTime in msec
    this.dayStartTime = constant.UNKNOWN_TIME

    this.games = null
    this.news = null
    this.teamList = []

    this.load(this.gameId)
    this.timer = setInterval(this._update.bind(this), this.getConfig().updateInterval)

    this.state = {
      hasGaveDefaultBalance: false
    }
  }

  load (gameId) {
    if (gameId === constant.GAMES.UNKNOWN) {
      // create a new game
      this.games = new odm.Games({
        config: this.getConfig()
      })

      this.games.save((function (err, game) {
        if (err) {
          debug.error(err)
          return
        }
        this.gameId = game._id

        for (let i = 1; i <= this.getConfig().teamNumber; i++) {
          let newTeam = new Team(this.getGameId(), {
            teamIndex: i,
            teammembers: this.getConfig().teammembers[i - 1]
          })
          this.getTeamList().push(newTeam)
        }

        this.stage = constant.GAME_STAGE.PREPARE
        debug.log(`GameId=${this.gameId} has been created.`)
      }).bind(this))
    } else {
      // load the exist game
    }
  }

  setGameStage (stage) {
    this.stage = stage

    switch (this.getGameStage()) {
      case constant.GAME_STAGE.START:
        // init the time system
        this.day += 1
        this.dayStartTime = Date.now()
        break
    }

    return this
  }

  nextGameStage () {
    let list = [
      'UNKNOWN',
      'PREPARE',
      'READY',
      'START',
      'FINAL',
      'END'
    ]

    if (this.getGameStage() == 'END') {
      return this
    }
    this.setGameStage(list[list.indexOf(this.getGameStage()) + 1])
    debug.log(`GameId='${this.getGameId()}': Stage has benn set to ${this.getGameStage()}`)
    return this
  }

  nextDay () {
    if (this.isOffWork()) {
      this.day += 1
      this.dayStartTime = Date.now()
    }
    return this
  }

  getDay () {
    return this.day
  }

  getDayStartTime () {
    return this.dayStartTime
  }

  getTime () {
    if (this.getDayStartTime() === constant.UNKNOWN_TIME) {
      return constant.UNKNOWN_TIME
    } else {
      return Date.now() - this.getDayStartTime()
    }
  }

  isWorking () {
    return this.getDayStartTime() !== constant.UNKNOWN_TIME
  }

  isOffWork () {
    return (this.getGameStage() === constant.GAME_STAGE.START) && !this.isWorking()
  }

  _update () {
    switch (this.getGameStage()) {
      case constant.GAME_STAGE.UNKNOWN:
        break

      case constant.GAME_STAGE.PREPARE:
        break

      case constant.GAME_STAGE.READY:
        // add default balance
        if (!this.state.hasGaveDefaultBalance) {
          let productItem = constant.AccountItem({
            day: this.getDay(),
            time: this.getTime(),
            balance: this.getConfig().defaultBalance
          })
          for (let team of this.getTeamList()) {
            team.getAccount().setBalance(productItem)
          }
          this.state.hasGaveDefaultBalance = true
        }
        break

      case constant.GAME_STAGE.START:
        // working -> off work
        // and into FINAL stage
        if (this.getTime() > this.getConfig().dayLong * 1000) {
          this.dayStartTime = constant.UNKNOWN_TIME
          if (this.day === this.gameConfig.days) {
            this.stage = constant.GAME_STAGE.FINAL

            // clear the timer
            clearInterval(this.timer)
          }
        }
        break

      case constant.GAME_STAGE.FINAL:
        break

      case constant.GAME_STAGE.END:
        break
    }
  }

  getGameStage () {
    return this.stage
  }

  getGameId () {
    return this.gameId
  }

  getConfig () {
    return this.gameConfig
  }

  getTeamNumber () {
    return this.getConfig().teamNumber
  }

  getTeamList () {
    return this.teamList
  }

  selectTeam (teamIndex) {
    return this.getTeamList()[teamIndex]
  }
}
