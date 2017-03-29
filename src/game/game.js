const Scenario = require('./scenario')
const debug = require('../lib/debug')
const config = require('../../config.json')
const {
  AccountModel,
  StorageModel,
  OrderModel,
  DeliverModel
} = require('./db/model')

class Game {
  constructor (props) {
    this.gameId = props.gameId || ''
    this.data = {
      numberOfUser: 0
    }
    this.state = {}
    this.user = []
  }

  init () {
    
  }

  start () {
    
  }

  getMoneyByTeam (team) {
    return new Promise((resolve, reject) => {
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
    })
  }

  order (orderInfo) {
    this.getMoneyByTeam(orderInfo.buyer.team)
      .then((total) => {
        if (total < orderInfo.quantity * orderInfo.unit_price) {
          throw new debug.Exception({
            id: 86,
            msg: orderInfo
          })
        }

        let newOrder = new OrderModel({
          game_id: this.gameId,
          product: orderInfo.product,
          quantity: orderInfo.quantity,
          unit_price: orderInfo.unitPrice,
          buyer: orderInfo.buyer,
          seller: orderInfo.seller
        })
        newOrder.save()
      })
      .catch((err) => {
        throw new debug.Exception({
          id: 8700,
          msg: orderInfo,
          syserr: err
        })
      })
  }

  deliver (deliverInfo) {
    this.getMoneyByTeam(deliverInfo.seller.team)
      .then((total) => {
        if (deliverInfo.cost > this.getMoneyByTeam(deliverInfo.seller.team)) {
          throw new debug.Exception({
            id: 6,
            msg: deliverInfo
          })
        }

        OrderModel.getCorrespondenceOrder(this.gameId, deliverInfo)
          .then((correspondenceOrder) => {
            return new Promise((resolve, reject) => {
              DeliverModel.aggregate(
                { $match: { game_id: this.gameId, order_id: correspondenceOrder._id } },
                { $group: { _id: null, total_quantity: {$sum: '$quantity'} } }
              )
              .exec()
              .then((result) => {
                if (result.length < 1) {
                  resolve(0)
                }
                resolve({
                  totalQuantity: (result[0] && result[0].total_quantity) || 0,
                  order: correspondenceOrder
                })
              })
              .catch((err) => {
                reject(err)
              })
            })
          })
          .then((totalQuantity) => {
            let diffQuantity = correspondenceOrder.quantity - totalQuantity
            let newOrderQuantity = 0
            let anotherOrderQuantity = 0
            if (deliverInfo.quantity > diffQuantity) {
              anotherOrderQuantity = deliverInfo.quantity - diffQuantity
            }
            newOrderQuantity = deliverInfo.quantity - anotherOrderQuantity

            if (anotherOrderQuantity > 0) {
              Object.assign()
              OrderModel.getCorrespondenceOrder(this.gameId, newDeliverInfo)
            }
          })
          .catch((err) => {
            throw new debug.Exception({
              id: 8800,
              msg: deliverInfo,
              syserr: err
            })
          })





        OrderModel.getCorrespondenceOrder(this.gameId, deliverInfo)
          .then((correspondenceOrder) => {
            this.getSeriesDeliver(this.gameId, correspondenceOrder)
              .then((totalQuantity) => {
                
              })
              .catch((err) => {
                throw new debug.Exception({
                  id: 8700,
                  msg: deliverInfo,
                  syserr: err
                })
              })
          })
          .catch((err) => {
            throw new debug.Exception({
              id: 8700,
              msg: deliverInfo,
              syserr: err
            })
          })
      })
      .catch((err) => {
        throw new debug.Exception({
          id: 8800,
          msg: deliverInfo,
          syserr: err
        })
      })
  }

  getOrderByBuyer (buyer, afterTime = 0) {
    return OrderModel.getOrderByBuyer(this.gameId, buyer, afterTime)
  }

  getOrderBySeller (seller, afterTime = 0) {

  }

  getDeliverByBuyer (buyer, afterTime = 0) {
    
  }

  getDeliverBySeller (seller, afterTime = 0) {
    
  }

  storage () {
    
  }
}




