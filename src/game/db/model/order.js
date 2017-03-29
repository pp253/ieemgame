require('../index')

const mongoose = require('mongoose')
const Position = require('./position')

const OrderSchema = new mongoose.Schema(
  {
    time: { type: Date, default: Date.now, require: true },
    game_id: { type: String, require: true },
    product: { type: String, require: true },
    quantity: { type: Number, require: true },
    unit_price: { type: Number, require: true },
    buyer: Position,
    seller: Position,
    delivered: { type: Boolean, default: false }
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
  findByNotDelivered: function () {
    return this.find({delivered: false})
  },
  findByDelivered: function () {
    return this.find({delivered: true})
  },
  getCorrespondenceOrder: function (gameId, deliverInfo) {
    return this.find({
      game_id: gameId,
      product: deliverInfo.product,
      buyer: deliverInfo.buyer,
      seller: deliverInfo.seller,
      delivered: false
    }).sort({time: 1}).limit(1).exec()
  },
  getOrderByBuyer: function (gameId, buyer, afterTime) {
    return this.find({
      game_id: gameId,
      buyer: buyer
    }).where('time').gt(new Date(afterTime))
      .sort({time: 1}).exec()
  }
}

module.exports = mongoose.model('Order', OrderSchema)
