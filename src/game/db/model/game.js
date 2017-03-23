require('../index')

const mongoose = require('mongoose')
const uuid = require('uuid-1345')

const GameSchema = new mongoose.Schema(
  {
    time: { type: Date, require: true, default: Date.now },
    end_time: { type: Date },
    game_id: { type: String,
      require: true,
      unique: true,
      default: uuid.v4
    }
  }
)

GameSchema.statics = {
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

module.exports = mongoose.model('GameModel', GameSchema)
