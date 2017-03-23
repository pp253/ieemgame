require('../index')

const mongoose = require('mongoose')

const DeliverSchema = new mongoose.Schema(
  {
    time: { type: Date, default: Date.now },
    game_id: { type: String, require: true },
    order_id: { type: String, require: true },
    product: { type: String, require: true },
    quantity: { type: Number, require: true },
    cost: { type: Number, require: true },
    buyer: { type: String, require: true },
    seller: { type: String, require: true }
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
  }
}

module.exports = mongoose.model('DeliverModel', DeliverSchema)
