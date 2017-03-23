require('../index')

const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema(
  {
    time: { type: Date, default: Date.now },
    game_id: { type: String, require: true },
    product: { type: String, require: true },
    quantity: { type: Number, require: true },
    unit_price: { type: Number, require: true },
    buyer: { type: String, require: true },
    seller: { type: String, require: true },
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
  }
}

module.exports = mongoose.model('OrderModel', OrderSchema)
