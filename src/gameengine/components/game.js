import _ from 'lodash'
import odm from '../../lib/db/odm'
import constant from '../../lib/constant'
import debug from '../../lib/debug'
import Team from './team'
import News from './news'

export const DEFAULT_CONFIG = {
  title: '試玩場 REDRO',
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
        [constant.PRODUCTS.CAR]: 6000
      },
      [constant.JOBS.RETAILER]: {
        [constant.PRODUCTS.CAR]: 9000
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
  updateInterval: 1000,
  news: [
    {
      day: 1,
      time: 0,
      title: '高田廠牌所製造的安全氣囊有瑕疵',
      content: '近幾個月各大車廠紛紛主動召回部分型號的車輛，主因是高田廠牌所製造的安全氣囊有瑕疵，當氣囊爆開，可能造成碎片、零件噴出，導致車內人員傷害。此一負面新聞發布後，使部分消費者打消買車的念頭，車市狀況慘淡。',
      picture: 'image/news/day1_rehearsal.jpg',
      demanded: 20,
      price: 3500
    },
    {
      day: 2,
      time: 0,
      title: '高田廠牌所製造的安全氣囊有瑕疵',
      content: '豐田汽車進一步表示，新的電池技術很有可能會讓旗下所有電動汽車性能都得到改進。電池技術研究人員指出，對於電動汽車來說，鋰離子電池是一項關鍵技術， 預估能讓每次充電行駛里程提高 10% 到 15% 的效能。全球汽車產業分析師評估這次的車用電池再進化會帶來50%的需求成長。',
      picture: 'image/news/day2_rehearsal.jpg',
      demanded: 30,
      price: 3500
    },
    {
      day: 3,
      time: 0,
      title: '高田廠牌所製造的安全氣囊有瑕疵',
      content: '3月11日發生在日本東北部的強烈地震及隨之引起的海嘯，重創日本各地並造成嚴重的人員傷亡和財物損失。而日本多家車廠亦在此次天災中受到影響。包含Toyota、Mitsubishi、Nissan等多家日本車廠皆已宣佈暫時停止生產，導致自用小客車的價格提高，民眾降低購買意願。',
      picture: 'image/news/day3_rehearsal.jpg',
      demanded: 20,
      price: 3500
    }
  ]
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

    this.market = {
      orderAmount: 0,
      storageAmount: 0,
      price: 3000
    }
    this.games = null
    this.news = null
    this.teamList = []
    this.timer = setInterval(this._update.bind(this), this.getConfig().updateInterval)

    this.state = {
      hasGivenDefaultBalance: false
    }

    return this.load(this.gameId)
  }

  load (gameId) {
    return new Promise((function (resolve, reject) {
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

          // load teams
          for (let i = 1; i <= this.getConfig().teamNumber; i++) {
            let newTeam = new Team(this.getGameId(), {
              teamIndex: i,
              teammembers: this.getConfig().teammembers[i - 1]
            })
            this.getTeamList().push(newTeam)
          }

          // load news
          this.news = new News(this.getGameId())
          for (let news of this.getConfig().news) {
            this.news.setNews(constant.NewsItem(news))
          }

          // set stage
          this.stage = constant.GAME_STAGE.PREPARE

          debug.log(`GameId='${this.gameId}' has been created.`)

          resolve({
            gameId: this.getGameId(),
            gameConfig: this.getConfig(),
            this: this
          })
        }).bind(this))
      } else {
        // load the exist game
      }
    }).bind(this))
    .catch((err) => { reject(err) })
  }

  save () {

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

    if (this.getGameStage() === 'END') {
      return this
    }
    this.setGameStage(list[list.indexOf(this.getGameStage()) + 1])
    this._update()

    debug.log(`GameId='${this.getGameId()}' Stage has benn set to ${this.getGameStage()}`)
    return this
  }

  nextDay () {
    if (this.isOffWork()) {
      this.settle()
      this.day += 1
      this.dayStartTime = Date.now()

      debug.log(`GameId='${this.getGameId()}' day has been set to ${this.getDay()}`)
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
    if (this.getGameStage() !== constant.GAME_STAGE.START) {
      return constant.UNKNOWN_TIME
    } else if (this.getDayStartTime() === constant.UNKNOWN_TIME) {
      return this.getConfig().dayLong * 1000
    } else {
      return Date.now() - this.getDayStartTime()
    }
  }

  isWorking () {
    return (this.getGameStage() === constant.GAME_STAGE.START) && (this.getDayStartTime() !== constant.UNKNOWN_TIME)
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
        if (!this.state.hasGivenDefaultBalance) {
          let productItem = constant.AccountItem({
            day: this.getDay(),
            time: this.getTime(),
            balance: this.getConfig().defaultBalance
          })
          for (let team of this.getTeamList()) {
            team.getAccount().setBalance(productItem)
          }
          this.state.hasGivenDefaultBalance = true
        }
        break

      case constant.GAME_STAGE.START:
        // working -> off work
        // and get into FINAL stage
        if (this.getTime() >= this.getConfig().dayLong * 1000) {
          this.dayStartTime = constant.UNKNOWN_TIME
          if (this.day === this.gameConfig.days) {
            this.stage = constant.GAME_STAGE.FINAL

            // clear the timer
            clearInterval(this.timer)
          }
        }

        // check news
        this.getMarket().orderAmount = this.getNews().getDemanded(this.getDay(), this.getTime())
        this.getMarket().price = this.getNews().getPrice(this.getDay(), this.getTime())
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

  getMarket () {
    return this.market
  }

  getTeamNumber () {
    return this.getConfig().teamNumber
  }

  getTeamList () {
    return this.teamList
  }

  getNews () {
    return this.news
  }

  selectTeam (teamIndex) {
    return this.getTeamList()[teamIndex - 1]
  }

  settle () {
    if (!this.isOffWork()) {
      return false
    }
    
    for (let team of this.getTeamList()) {
      let cost = 0
      
      // wage
      cost += this.getConfig().cost.wage * team.getConfig().teammembers

      // storage
      let storageCost = this.getConfig().cost.storage
      for (let job of _.values(constant.JOBS)) {
        if (job === 'UNKNOWN') {
          continue
        }
        for (let productItem of team.selectJob(job).storage.getStorageList()) {
          cost += Math.ceil(productItem.amount / storageCost.patchSize) * storageCost[job][productItem.product]
        }
      }

      team.getAccount().take(constant.AccountItem({
        day: this.getDay(),
        time: this.getTime(),
        balance: cost
      }))
    }
  }
}
