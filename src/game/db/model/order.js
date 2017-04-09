require('../index')

const mongoose = require('mongoose')
const constant = require('./constant')

const OrderSchema = new mongoose.Schema(
  {
    time: { type: constant.Time, default: Date.now, require: true },
    game_id: { type: constant.GameId, require: true },
    product: { type: constant.Product, require: true },
    quantity: { type: constant.Quantity, require: true },
    unit_price: { type: constant.UnitPrice, require: true },
    buyer: constant.Position,
    seller: constant.Position,
    delivered: { type: constant.Delivered, default: 0 }
  }
)

OrderSchema.statics = {
  findByBuyer: function (buyer) {
    return this.find({buyer: buyer})
  },
  findBySeller: function (seller) {
    return this.find({seller: seller})
  },
  findByBuyerAndSeller: function (buyer, seller) {
    return this.find({buyer: buyer}).find({seller: seller})
  },
  getNotDeliveredOrders: function (gameId, deliverInfo) {
    return this.find({
      game_id: gameId,
      product: deliverInfo.product,
      buyer: deliverInfo.buyer,
      seller: deliverInfo.seller,
      $where: 'this.delivered < this.quantity'
    }).sort({time: 1}).exec()
  },
  getOrder: function (gameId, afterTime) {
    return this.find({
      game_id: gameId
    }).where('time').gt(new Date(afterTime))
      .sort({time: 1}).exec()
  },
  getOrderByBuyer: function (gameId, buyer, afterTime) {
    return this.find({
      game_id: gameId,
      buyer: buyer
    }).where('time').gt(new Date(afterTime))
      .sort({time: 1}).exec()
  },
  getOrderBySeller: function (gameId, seller, afterTime) {
    return this.find({
      game_id: gameId,
      seller: seller
    }).where('time').gt(new Date(afterTime))
      .sort({time: 1}).exec()
  }
}

module.exports = mongoose.model('order', OrderSchema)
