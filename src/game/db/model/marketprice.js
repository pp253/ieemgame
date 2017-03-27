require('../index')

const mongoose = require('mongoose')

const MarketPriceSchema = new mongoose.Schema(
  {
    time: { type: Date, require: true, default: Date.now },
    game_id: { type: String, require: true },
    product: { type: String, require: true },
    price: { type: Number, require: true }
  }
)

MarketPriceSchema.statics = {
  getPrice: function (gameId, product) {
    return this.find({product: product}).sort({time: 1}).limit(1)
  },
  setNewPrice: function (gameId, product, price) {
    // return this.find({product: product}) //
  }
}

module.exports = mongoose.model('MarketPriceModel', MarketPriceSchema)
