require('../index')

const mongoose = require('mongoose')

const SpecialIncomeOutcomeSchema = new mongoose.Schema(
  {
    time: { type: Date, require: true, default: Date.now },
    game_id: { type: String, require: true },
    product: { type: String, require: true },
    quantoty: { type: Number, require: true },
    price: { type: Number, require: true },
    getter: { type: Number, require: true }
  }
)

SpecialIncomeOutcomeSchema.statics = {
  getTotal: function (gameId, product) {
    return this.find({product: product}).sort({time: 1}).limit(1)
  }
}

module.exports = mongoose.model('SpecialIncomeOutcomeModel', SpecialIncomeOutcomeSchema)
