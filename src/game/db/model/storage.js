require('../index')

const mongoose = require('mongoose')
const constant = require('./constant')

const StorageSchema = new mongoose.Schema(
  {
    time: { type: constant.Time, default: Date.now },
    game_id: { type: constant.GameId, require: true },
    product: { type: constant.Product, require: true },
    quantity: { type: constant.Quantity, require: true },
    cost: { type: constant.Cost, require: true },
    buyer: constant.Position,
    seller: constant.Position
  }
)

StorageSchema.statics = {
  findByGameId: function (gameId) {
    return this.find({game_id: gameId})
  },
  findByProduct: function (product) {
    return this.find({product: product})
  },
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

module.exports = mongoose.model('storage', StorageSchema)
