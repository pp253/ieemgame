require('../index')

const mongoose = require('mongoose')
const Position = require('./position')

const OrderSchema = new mongoose.Schema(
  {
    time: { type: Date, default: Date.now, require: true },
    game_id: { type: String, require: true },
    product: { type: Number, require: true },
    quantity: { type: Number, require: true },
    unit_price: { type: Number, require: true },
    buyer: Position,
    seller: Position,
    delivered: { type: Number, default: 0 }
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
