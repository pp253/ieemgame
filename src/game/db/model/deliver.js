require('../index')

const mongoose = require('mongoose')
const Position = require('./position')

const DeliverSchema = new mongoose.Schema(
  {
    time: { type: Date, default: Date.now },
    game_id: { type: mongoose.Schema.ObjectId, require: true },
    product: { type: Number, require: true },
    quantity: { type: Number, require: true },
    cost: { type: Number, require: true },
    buyer: Position,
    seller: Position
  }
)

DeliverSchema.statics = {
  findByBuyer: function (buyer) {
    return this.find({buyer: buyer})
  },
  findBySeller: function (seller) {
    return this.find({seller: seller})
  },
  findByBuyerAndSeller: function (buyer, seller) {
    return this.find({buyer: buyer}).find({seller: seller})
  },
  getDeliver: function (gameId, afterTime) {
    return this.find({
      game_id: gameId,
      time: {$gt: afterTime}
    }).sort({time: 1}).exec()
  },
  getDeliverByBuyer: function (gameId, buyer, afterTime) {
    return this.find({
      game_id: gameId,
      buyer: buyer
    }).where('time').gt(new Date(afterTime))
      .sort({time: 1}).exec()
  },
  getDeliverBySeller: function (gameId, seller, afterTime) {
    return this.find({
      game_id: gameId,
      seller: seller
    }).where('time').gt(new Date(afterTime))
      .sort({time: 1}).exec()
  }
}

module.exports = mongoose.model('deliver', DeliverSchema)
