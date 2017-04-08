// const Scenario = require('./scenario')
const debug = require('../lib/debug')
const config = require('../../config.json')
const {
  GameModel,
  AccountModel,
  StorageModel,
  OrderModel,
  DeliverModel
} = require('./db/model')

const PRODUCTS = {
  PRODUCT_CARS: 0,
  MATIRIAL_A: 1,
  MATIRIAL_B: 2,
  MATIRIAL_C: 3,
  STORAGE: 4,
  WAGE: 5,
  TRUCKS: 6
}

const PRICE = {
  PRODUCT_CARS: 1000,
  MATIRIAL_A: 20,
  MATIRIAL_B: 20,
  MATIRIAL_C: 20,
  STORAGE: 800,
  WAGE: 200,
  TRUCKS: 200,
  DELIVER_COST_PER_TRUCK: 100
}

const JOBS = {
  UNKNOWN: -1,
  STAFF_EXleft: 0,
  STAFF_MARKET: 1,
  TEAM_FACTORY: 2,
  TEAM_WHOLESELLER: 3,
  TEAM_RETAILER: 4,
  TEAM_LEADER: 5
}

const TEAM_CATE = {
  UNKNOWN: -1,
  STAFF: 0,
  TEAM: 1
}

const STAGE = {
  PREPARE: 0,
  WAITING_LOGIN: 1,
  READY: 2,
  ROUND: 3,
  ROUND_END: 4,
  GAME_END: 5
}

let nowGame = null

function newGame () {
  return new Promise((resolve, reject) => {
    if (nowGame) {
      resolve(nowGame)
    } else {
      let game = new Game()
      game
        .then((newGameCon) => {
          nowGame = newGameCon
          resolve(newGameCon)
        })
        .catch((err) => {
          reject(err)
        })
    }
  })
}

function getNowGame () {
  return nowGame
}

class Game {
  constructor (props) {
    this.gameId = ''
    this.data = {
      numberOfUser: 0
    }
    this.state = {
      day: 0,
      time: 0,
      timer: null,
      teams: 0,
      users: 0
    }
    this.team = {}
    this.user = {}
    this.stage = STAGE.PREPARE

    this.addUser = this.addUser.bind(this)
    this.nextStage = this.nextStage.bind(this)
    this.order = this.order.bind(this)
    this._order = this._order.bind(this)
    this.timer = this.timer.bind(this)

    return new Promise((resolve, reject) => {
      GameModel({}).save()
        .then((doc) => {
          if (!doc._id) {
            throw new debug.Exception({
              id: 9
            })
          }

          this.gameId = doc._id
          this.stage = STAGE.WAITING_LOGIN
          resolve(this)
        })
        .catch((err) => {
          throw new debug.Exception({
            id: 1,
            syserr: err
          })
        })
    })
  }

  end () {
    if (this.stage !== STAGE.GAME_END) {
      throw new debug.Exception({
        id: 1
      })
    }
    GameModel.update({_id: this.gameID}, {$set: {end_time: Date.now()}})
    nowGame = null
  }

  addUser (position) {
    if (this.stage !== STAGE.WAITING_LOGIN) {
      throw new debug.Exception({
        id: 1,
        msg: 'The game stage is not WAILTING_LOGIN'
      })
    }
    return new Promise((resolve, reject) => {
      if (position.team === TEAM_CATE.STAFF) {
        this.user[0][position.job] = 1
      }
      resolve(this)
    })
  }

  nextStage () {
    switch (this.stage) {
      case STAGE.WAITING_LOGIN:
        if (this.state.day === 0) {
          this.stage = STAGE.READY
        }
        break
      case STAGE.READY:
        if (this.state.day === 0) {
          this.state.day = 1
          this.time = 0
          this.state.timer = this.timer()
          this.stage = STAGE.ROUND
        }
        break
      case STAGE.ROUND_END:
        if (this.state.day < config.game.default.round.days) {
          this.state.time = 0
          this.state.day += 1
          this.stage = STAGE.ROUND
        } else {
          this.stage = STAGE.GAME_END
        }
        break
    }
    return this.stage
  }

  timer () {
    return setInterval(() => {
      if (this.stage === STAGE.ROUND) {
        this.state.time += 1
        if (this.state.time >= config.game.default.round.dayLong) {
          this.state.time = 0
          this.stage = STAGE.ROUND_END
        }
      }
    }, 1000)
  }

  getMoneyByTeam (team) {
    return new Promise((resolve, reject) => {
      resolve(100000) // dummy
      /*
      AccountModel.aggregate(
        { $match: { game_id: this.gameId, team: team } },
        { $group: { _id: null, total: {$sum: '$money'} } }
      )
      .exec()
      .then((result) => {
        if (result.length < 1) {
          resolve(0)
        }
        resolve(result[0].total)
      })
      .catch((err) => {
        reject(err)
      })
      */
    })
  }

  /**
   * 使orderRequest加上unit_price，再丟到_order
   * @param {*} orderRequest
   * @return {Promise}
   */
  order (orderRequest) {
    if (this.stage !== STAGE.ROUND) {
      throw new debug.Exception({
        id: 1
      })
    }
    let unitPrice = PRICE[orderRequest.product]
    if (orderRequest.buyer.team === orderRequest.seller.team) {
      unitPrice = 0
    }
    let orderInfo = Object.assign(orderRequest, {
      unit_price: unitPrice
    })
    return this._order(orderInfo)
  }

  /**
   * 使orderInfo加上gameId，再丟到OrderModel後儲存
   * @param {*} orderInfo
   * @return {Promise}
   */
  _order (orderInfo) {
    return new Promise((resolve, reject) => {
      orderInfo = Object.assign({
        game_id: this.gameId
      }, orderInfo)
      let newOrder = new OrderModel(orderInfo)
      resolve(newOrder.save())
    })
  }

  deliver (deliverRequest) {
    if (this.stage !== STAGE.ROUND) {
      throw new debug.Exception({
        id: 1
      })
    }
    let cost = parseInt((deliverRequest.product + 3) /
      config.game.default.deliver.products_per_truck) * PRICE.DELIVER_COST_PER_TRUCK

    if (deliverRequest.buyer.team !== deliverRequest.seller.team) {
      cost = 0
    }
    let deliverInfo = Object.assign(deliverRequest, {
      cost: cost
    })
    return this._deliver(deliverInfo)
  }

  _deliver (deliverInfo) {
    return new Promise((resolve, reject) => {
      OrderModel.getNotDeliveredOrders(this.gameId, deliverInfo)
        .then((ordersResult) => {
          let left = deliverInfo.quantity
          for (let {_doc: order} of ordersResult) {
            let used = order.quantity - order.delivered > left
              ? left : order.quantity - order.delivered
            if (used === 0) {
              break
            }
            OrderModel.update({ _id: order._id }, { $set: { delivered: order.delivered + used } }, () => {
            })
            left = left - used
          }

          let newQuantity = deliverInfo.quantity - left
          if (newQuantity === 0) {
            throw new debug.Exception({
              id: 1
            })
          }

          let newDeliverInfo = Object.assign(deliverInfo, {
            game_id: this.gameId,
            quantity: deliverInfo.quantity - left
          })
          let newDeliver = new DeliverModel(newDeliverInfo)
          return newDeliver.save()
        })
        .then((doc) => {
          resolve(doc)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  getOrder (afterTime = 0) {
    return OrderModel.getOrder(this.gameId, afterTime)
  }

  getOrderByBuyer (buyer, afterTime = 0) {
    return OrderModel.getOrderByBuyer(this.gameId, buyer, afterTime)
  }

  getOrderBySeller (seller, afterTime = 0) {
    return OrderModel.getOrderBySeller(this.gameId, seller, afterTime)
  }

  getDeliver (afterTime = 0) {
    return DeliverModel.getDeliver(this.gameId, afterTime)
  }

  getDeliverByBuyer (buyer, afterTime = 0) {
    return DeliverModel.getDeliverByBuyer(this.gameId, buyer, afterTime)
  }

  getDeliverBySeller (seller, afterTime = 0) {
    return DeliverModel.getDeliverBySeller(this.gameId, seller, afterTime)
  }

  storage (storageRequest) {
    
  }

  _storage (storageInfo) {
    
  }
}

exports.newGame = newGame
exports.getNowGame = getNowGame
exports.Game = Game
